# Dumpster Finder

An app for dumpster divers

## Requirements

This app is developed in React native, you'll need some (recent) version of `npm` installed.

## Usage

To run the app with connection to an instance of our backend,
you need to specify the address to the server.
**Make sure the server is running.**

Create a `.env` file with variables like those set in `.env.template` – it might look like this:

```sh
API_URL=http://xxx.yy.zz:3000/api/
PIC_URL=http://xxx.yy.zz:3001/pic/
```

Or like this, if you have a domain name and are running a proper instance with HTTPS:

```sh
API_URL=https://your.domain/api/
PIC_URL=https://your.domain/pic/
```

Install dependencies:

```sh
npm install
```

Then start the app in development mode:

```sh
npm start
```

Now you should be able to connect an emulator or a device to the Expo server.

## Publishing

Create an Expo account and run `expo build:android` or `expo build:ios` to build and publish the app.
On subsequent deployments, you should just need to do `expo publish` to update the JS bundle,
since the native code should stay more or less the same.

## Generating documentation

Simply run `npm run docs` and open `docs/index.html` in a browser to read it.

## Credits

This project was bootstrapped with Expo's tab bar template.
Some files are very similar to that template's version of them.

We also wrote a [modified version](components/basicComponents/ButtonGroup.tsx) of Kitten's ButtonGroup component.
