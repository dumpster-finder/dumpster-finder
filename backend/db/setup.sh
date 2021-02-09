#!/bin/sh
for script in init data
do
  mysql --user=root --password=thecakeisalive dumpster < "$script".sql
done
