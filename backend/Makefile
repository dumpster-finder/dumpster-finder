.PHONY: all tables local-tables upload

all: compose

tables:
	./tables.sh init constants

# Test data as well as initialization
data:
	./tables.sh init constants data

upload:
	rsync --archive \
        --exclude='.git' \
        --exclude='node_modules' \
        --exclude='.env' \
        --exclude='dhparam' \
        ./ "dumpster@${SERVER_IP}:dumpster"
