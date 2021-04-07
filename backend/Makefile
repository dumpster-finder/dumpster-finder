.PHONY: all tables local-tables upload

all: compose

tables:
	./tables.sh

local-tables:
	mysql --user=root \
	    --password=thecakeisalive \
	    dumpster < db/init.sql

upload:
	rsync --archive \
        --exclude='.git' \
        --exclude='node_modules' \
        --exclude='.env' \
        --exclude='dhparam' \
        ./ "dumpster@${SERVER_IP}:dumpster"
