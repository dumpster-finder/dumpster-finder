.PHONY: all tables local-tables it start stop logs api-logs db-logs

all: compose

tables:
	./tables.sh

local-tables:
	mysql --user=root \
	    --password=thecakeisalive \
	    dumpster < db/init.sql

it start:
	docker-compose --env-file api/.env up -d --build

it restart:
	docker-compose --env-file api/.env restart

it stop:
	docker-compose --env-file api/.env down

logs:
	docker-compose --env-file api/.env logs

api-logs:
	docker-compose --env-file api/.env logs api

db-logs:
	docker-compose --env-file api/.env logs db
