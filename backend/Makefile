tables:
	docker-compose run db sh -c "mysql --user=root \
	    --password=thecakeisalive \
	    --host=db dumpster" < db/init.sql

local-tables:
	mysql --user=root \
	    --password=thecakeisalive \
	    dumpster < db/init.sql
