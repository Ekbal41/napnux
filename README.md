# Napnux

A fast and low-overhead web framework for Node JS. [Node.js](http://nodejs.org).

[![NPM Version][npm-version-image]][npm-url]
[![NPM Install Size][npm-install-size-image]][npm-install-size-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

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
- Cli for generating project ot apps quickly

## Link to Docs

- [Website and Documentation](https://napnux.vercel.app/)

## Quick Start

The quickest way to get started with napnuxt is to use `nux-cli` to generate a project.

```console
 npm install -g nux-cli
```

To create a project:

```console
 nux-cli init
```

And follow the given instructions

Install dependencies: In the project directory,

```console
 npm install
```

To start the dev server:

```console
$ npm run dev
```

View the website at: http://localhost:3001



## License

[MIT](LICENSE)

[npm-downloads-image]: https://badgen.net/npm/dm/napnux
[npm-downloads-url]: https://npmcharts.com/compare/napnux?minimal=true
[npm-install-size-image]: https://badgen.net/packagephobia/install/napnux
[npm-install-size-url]: https://packagephobia.com/result?p=napnux
[npm-url]: https://npmjs.org/package/napnux
[npm-version-image]: https://badgen.net/npm/v/napnux
