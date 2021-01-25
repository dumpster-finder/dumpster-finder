.PHONY: all tables maria clean

all: maria tables

maria: Dockerfile
	docker image build -t maria .
	docker run --detach --name db maria

tables:
	docker exec db bash setup.sh

clean:
	docker container stop db
	docker container rm db
	docker image rm maria
