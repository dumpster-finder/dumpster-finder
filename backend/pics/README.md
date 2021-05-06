# Picture server

This file contains instructions for running the picture server for development purposes only.
See [the backend README](../README.md) for instructions for running a production/testing instance.

## Running the server

Create a `.env` file containing something like the following:

```dotenv
PIC_PORT=3000
PIC_HOST=localhost
API_URL=http://localhost:3000/api/
# and so on
```

... as specified in the [.env.template](.env.template) file.

Run `npm install` to install dependencies, then run `npm start` to start the picture server.

## Generating documentation

Simply run `npm run docs` and open `docs/index.html` in a browser to read it.
