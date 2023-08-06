# Napnux

A fast and low-overhead web framework for [Node.js](http://nodejs.org).

```js
const napnux = require("napnux");
const port = 3001;

napnux()
  .get("/", (req, res) => {
    res.end("Hello World");
  })
  .start(port, () => {
    console.log(`Your first app listening on port ${port}`);
  });
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

```console
 npm install napnux
```

Follow [our installing guide](https://napnux.vercel.app/docs/get-started/)
for more information.

## Features

- High performance
- Good routing
- Concept of apps
- Cli for generating project or apps quickly

## Link to Docs

- [Website and Documentation](https://napnux.vercel.app/)

## Quick Start

The quickest way to get started with napnux is to use `nux-cli` to generate a project.

```console
 npm install -g nux-cli
```

To create a project  run the following command and follow the given instructions

```console
 nux-cli init
```


Install dependencies:

```console
 npm install
```

To start the dev server:

```console
npm run dev
```

View the website at: http://localhost:3001



## License

[MIT](LICENSE)
