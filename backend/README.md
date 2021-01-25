# Backend

Split into API server, database server and file server.

## Instructions

To build the images and start docker-compose deattached:

```sh
docker-compose up -d
```

To run the setup script against the database, which creates the necessary tables and procedures:

```sh
make tables
```

To stop and clean up the containers:

```sh
docker-compose down
```
