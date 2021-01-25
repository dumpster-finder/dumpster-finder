# Database

We use MariaDB, a popular fork of MySQL.

These instructions are for running the database in a Docker container outside of `docker-compose`.

## Instructions

To build the image and start it:

```sh
make maria
```

To run the setup script against the database, which creates the necessary tables and procedures:

```sh
make tables
```

**NB**: You might need to wait for a few seconds before executing this command.

To clean up the containers:

```sh
make clean
```
