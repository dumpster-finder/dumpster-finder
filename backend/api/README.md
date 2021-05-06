# API server

This file contains instructions for running the API server for development purposes only.
See [the backend README](../README.md) for instructions for running a production/testing instance.

## Running the server

Create a `.env` file containing something like the following:

```dotenv
API_HOST=127.0.0.1
API_PORT=3000
DB_HOST=127.0.0.1
# and so on
```

... as specified in the [.env.template](.env.template) file.

Note that you _must_ use `127.0.0.1` and not `localhost` as the database host if you run it in a Docker container.

Depending on where you run the app, you may need to change the `PHOTO_URL` variable to match the IP the app makes contact with.

Run `npm install` to install dependencies,
then run `npm start` to start the API server.
**Make sure that your database is running**,
otherwise the API server will crash after 10 unsuccessful connection attempts.

## Running the tests

Run `npm test` after setting up the server.

## Generating documentation

Simply run `npm run docs` and open `docs/index.html` in a browser to read it.
