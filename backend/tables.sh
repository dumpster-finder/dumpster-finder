#!/bin/sh
# Usage: ./tables.sh init constants (data)
# Generates tables and test data on a deployed server
for script in "$@"
do
    echo "Running $script..."
    docker-compose run -e LANG=en_US.UTF-8 db sh -c "mysql --user=root \
	      --password=thecakeisalive \
	      --host=db dumpster < $script.sql"
done
