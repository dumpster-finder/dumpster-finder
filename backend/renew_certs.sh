#!/bin/sh
#
# Following https://www.digitalocean.com/community/tutorials/how-to-secure-a-containerized-node-js-application-with-nginx-let-s-encrypt-and-docker-compose

set -e

COMPOSE="docker-compose --no-ansi" # why though

cd "$PROJECT_PATH" # requires exporting PROJECT_PATH in your .profile or something
$COMPOSE run certbot renew && $COMPOSE kill -s SIGHUP nginx
docker system prune -af
