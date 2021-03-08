#!/bin/bash
source ../api/.env # fetch variables

for script in init data
do
    echo "Running $script..."
    mysql --host="${DB_HOST:-127.0.0.1}" \
          --user="${DB_USER:-root}" \
          --password="${DB_PASSWORD:-thecakeisalive}" \
          "${DB_NAME:-dumpster}" < "$script".sql
done
