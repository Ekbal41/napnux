<img src="https://github.com/Ekbal41/napnux/blob/main/napnux.png" width=50% height=50%>

A low-overhead and speedy web framework for [Node.js](http://nodejs.org).

## Example Usage

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
- Efficient routing
- Intuitive app architecture
- Command-line interface for rapid project and app generation

## Link to Docs

- [Website and Documentation](https://napnux.vercel.app/)

## Quick Start

The easiest way to begin with Napnux is by using the command-line interface (CLI) to generate a new project.  
First, install Napnux globally:

```console
 npm install -g napnux
```

Then create a project with the following command:

```console
 nux create-project <projectName>
```

To start the development server, navigate to the project directory and run:

```console
cd <projectName>
npm run dev
```

Your development server will be accessible at: http://localhost:3001.

## License

[MIT](LICENSE)
