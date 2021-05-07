# Database

We use MariaDB, a popular fork of MySQL.

These instructions are for running the database in a Docker container outside of `docker-compose`.
See [the backend README](../README.md) for instructions for running a production/testing instance.

## Instructions

To build the image and start it:

```sh
make maria
```

Alternatively, to start a local MariaDB server on WSL:

```sh
make wsl
```

To run the setup script against the database, which creates the necessary tables and procedures:

```sh
make tables
```

To fill the tables with test data:

```sh
make data
```

**NB**: You might need to wait for a few seconds before executing this command. Additionally, *make sure* to have a `.env` file in the backend folder.

To clean up the containers:

```sh
make clean
```

Note for Windows users, or others who run into trouble: If these instructions do not work,
try cloning the repo with LF line endings instead of Windows' default CRLF
– or just look at the [Makefile](Makefile) and [setup script](setup.sh) and adapt the commands to your needs.
