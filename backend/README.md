# Backend

Split into API server, database server and file server.

The database server is *not* exposed to the public.

## Usage

To build the images and start docker-compose deattached:

```sh
make it start # in this folder
# or
systemctl --user start dumpster # if the service is installed
```

To run the setup script against the database, which creates the necessary tables and procedures:

```sh
make tables
```

To stop and clean up the containers:

```sh
make it stop # in this folder
# or
systemctl --user stop dumpster # if the service is installed
```

To restart the containers if something went slightly wrong:

```sh
make it restart # in this folder
# or
systemctl --user restart dumpster # if the service is installed
```

## Deployment

Acquire a server with a recent Linux distro, install rsync, Docker and Docker Compose, e.g.:

```shell
apt install rsync docker.io docker-compose
```

You _should_ set up SSH keys and disable password-based authentication.

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

Copy your .env file and make a few changes:

```shell
scp backend/api/.env "dumpster@$SERVER_IP:dumpster/api"
ssh dumpster@$SERVER_IP sed -i "s/DB_HOST=localhost/DB_HOST=db/" \
                               "s/API_HOST=localhost/API_HOST=<your server's IP>/" \
                               dumpster/api/.env
```

Copy over the `systemd` unit, reload the daemon and start the service:

```shell
scp backend/dumpster.service \
    "dumpster@$SERVER_IP:.config/systemd/user/"
ssh dumpster@$SERVER_IP systemctl daemon-reload
ssh dumpster@$SERVER_IP systemctl --user start dumpster
```

After this, the `.gitlab-ci.yml` file should make GitLab CI perform updates automatically after changes to `develop`.


## SSH hardening

Using SSH keys and disabling password authentication is the most important security measure we've taken.

We also installed `fail2ban` with a basic configuration (in `/etc/fail2ban/jail.local`):

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
