.PHONY: all tables maria clean

all: maria tables

maria: Dockerfile
	docker image build -t maria .
	docker run --detach -p 3306:3306 --name db maria

tables:
	mysql --host=127.0.0.1 --user=root --password=thecakeisalive dumpster < init.sql


clean:
	docker container stop db
	docker container rm db
	docker image rm maria
