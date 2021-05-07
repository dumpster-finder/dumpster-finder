# Backend

Split into API server, database server and file server.

The database server is *not* exposed to the public.

For instructions for running each part of the backend locally (without much fuzz), see

+ [Database README](db/README.md)
+ [API server README](api/README.md)
+ [Photo server README](pics/README.md)

and start them in that order.

## Usage

To build the images and start docker-compose deattached:

```sh
docker-compose up -d --build # in this folder
# or
systemctl --user start dumpster # if the service is installed
```

To run the setup script against the database, which creates the necessary tables and procedures:

```sh
make tables
```

To stop and clean up the containers:

```sh
docker-compose down # in this folder
# or
systemctl --user stop dumpster # if the service is installed
```

To restart the containers if something went slightly wrong:

```sh
docker-compose restart # in this folder
# or
systemctl --user restart dumpster # if the service is installed
```

## Deployment

Acquire a server with a recent Linux distro, install rsync, Docker and Docker Compose, e.g.:

```shell
apt install rsync docker.io docker-compose
```

You _should_ set up SSH keys and disable password-based authentication, see [SSH hardening](#ssh-hardening).

Create a user (e.g. `dumpster`) without administrative privileges, but in the `docker` group:

```shell
useradd --create-home dumpster
groupadd docker
usermod -aG docker dumpster
```

<!-- This will only _partially_ prevent some escalation, but should work as _some_ sort of measure -->

Let `$SERVER_IP` be your server's IP in the following snippets.

Transfer the contents of your repository to an appropriate folder in the `dumpster` user's home directory:
(this assumes you stand in the root directory of the repo)

```shell
rsync --archive
      --exclude='.git'
      --exclude='node_modules'
      --exclude='.env'
      backend/ "dumpster@$SERVER_IP:dumpster"
```

Copy your API's .env template file and make a dynamic link to it:

```shell
scp backend/api/.env.template "dumpster@$SERVER_IP:dumpster/api"
ssh dumpster@$SERVER_IP ln -s dumpster/api/.env dumpster/.env
```

Then tweak it to fit the following pattern:

```shell
HTTPS=true
PROJECT_PATH=/home/dumpster/dumpster
# API server:
API_PORT=3000
API_HOST="<your server's domain or IP>"
NODE_ENV=production
TOKEN_SECRET="<some random, long string>"
# Photo server:
PHOTO_URL="https://<your server's domain or IP>/pic/"
# Database:
DB_NAME=dumpster
DB_USER=root
DB_PASSWORD="<your database password>"
DB_HOST=db
DB_PORT=3306
DB_DIALECT=mariadb
# Certbot:
EMAIL="<email of whoever wants to sign this>"
DOMAIN_NAME="<your server's domain or IP>"
```

Copy over the photo server's .env template

```shell
scp backend/pics/.env.template "dumpster@$SERVER_IP:dumpster/pics"
```

and tweak it a little as well – it should look like this:

```shell
PIC_PORT=3000
PIC_HOST=pics
PIC_URL="https://<your server's domain or IP>/pic/"
API_URL=http://api:3000/api/
PIC_FOLDER=/var/uploads/
PIC_MAX_SIZE=10000000
```

**Ideally, you'd set up HTTPS for some extra security here, see [SSL certificates](#ssl-certificates) for instructions.**

Copy over the `systemd` unit, reload the daemon and start the service:

```shell
scp backend/dumpster.service \
    "dumpster@$SERVER_IP:.config/systemd/user/"
ssh dumpster@$SERVER_IP systemctl daemon-reload
ssh dumpster@$SERVER_IP systemctl --user start dumpster
```

Wait a few seconds, then create the database tables:

```shell
ssh dumpster@$SERVER_IP "cd dumpster && make tables"
```

After this, the `.gitlab-ci.yml` file should make GitLab CI perform updates automatically after changes to `develop`.
The server should be up and running, accessible from port 443 (or port 80 if you didn't enable HTTPS).


## SSH hardening

Using SSH keys and disabling password authentication are important security measures you may want to take.
Specifically, generate an SSH key for your computer, add the public key to `.ssh/authorized_keys`,
make sure you can log in without a password, and finally disable the `PasswordAuthentication` option in the SSH config (and perhaps disable `PermitRootLogin` as well).

You can also install `fail2ban` and run it with a basic configuration like this (in `/etc/fail2ban/jail.local`):

```ini
[DEFAULT]
; a rather strict penalty
bantime = 1d

[sshd]
enabled = true
; since we use ufw, make fail2ban use it too
banaction = ufw
; (this could be a bad idea)
ignoreip = <your server's IP>
```

Specific changes to the SSH config:  
(generated with `diff /etc/ssh/sshd_config{.backup,}`)

```diff
32c32
< #PermitRootLogin prohibit-password
---
> PermitRootLogin no
56c56
< #PasswordAuthentication yes
---
> PasswordAuthentication no
89c89
< X11Forwarding yes
---
> X11Forwarding no
98,99c98,99
< #ClientAliveInterval 0
< #ClientAliveCountMax 3
---
> ClientAliveInterval 300
> ClientAliveCountMax 3
```

## SSL certificates

The HTTPS setup detailed in this section was influenced by
[a Digital Ocean tutorial](https://www.digitalocean.com/community/tutorials/how-to-secure-a-containerized-node-js-application-with-nginx-let-s-encrypt-and-docker-compose).

In order to secure the connection between the app and your instance of the server,
you should acquire an SSL certificate and enable HTTPS.
Our setup uses `certbot` to get certificates signed by Let's Encrypt,
for no cost at all.
You _do_ need a server that is available to the outside world,
otherwise the servers of Let's Encrypt won't be able to access your server.

Create a Diffie-Hellman key in the `backend` folder:

```shell
mkdir dhparam
openssl dhparam -out dhparam/dhparam-2048.pem 2048
```

Comment out the second server block in the NGINX config,
and uncomment the parts of the first server block that are indicated by other comments.
Since you do not yet have a certificate, everything must happen through HTTP.
Let's Encrypt needs to be able to query for your challenge file.

```conf
http {
    # (...)
    
    server {
        # (...)

        # (uncomment when first acquiring SSL cert)
        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;
        
        location ~ /.well-known/acme-challenge {
            allow all;
            root /var/www/html;
        }
        
        # (uncomment when first acquiring SSL cert)
        location / {
            allow all;
        }
        
        # (...)
    }

    # (comment out when first acquiring SSL cert)
    # server {
    # (...)
    # }
}
```

Start the service and check the logs with `docker-compose logs certbot`.
If no issues crop up, proceed.

Now that you _do_ have a certificate, revert your changes to `nginx.conf` and restart the service.
It should be possible to access your server through a normal web browser. Confirm that your connection is encrypted.

To renew your certificate automatically, add an entry in your crontab (with `crontab -e`):
```cron
0 6 * * * PROJECT_PATH=/home/user/dumpster-finder /home/user/dumpster-finder/renew_certs.sh >> /home/user/cron.log 2>&1
```
(the `PROJECT_PATH` is required to let the script navigate into the correct folder)
