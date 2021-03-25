.PHONY: all tables maria clean

all: maria tables

maria: Dockerfile
	docker image build -t maria .
	docker run --detach -p 3306:3306 --name db maria

wsl:
	sudo /etc/init.d/mysql start

tables:
	cat setup.sh | tr -d '\r' | bash

clean:
	docker container stop db
	docker container rm db
	docker image rm maria
