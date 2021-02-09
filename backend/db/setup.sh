#!/bin/sh
for script in init data
do
  mysql --host=127.0.0.1 --user=root --password=thecakeisalive dumpster < "$script".sql
done
