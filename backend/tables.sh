#!/bin/sh
# Generates tables and test data on a deployed server
for script in init data
do
    echo "Running $script..."
    docker-compose run db sh -c "mysql --user=root \
	      --password=thecakeisalive \
	      --host=db dumpster" < db/"$script".sql
done
