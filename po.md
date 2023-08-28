# Napnux: A Low-Overhead and Speedy Web Framework for Node.js

![Napnux Logo](https://github.com/Ekbal41/napnux/blob/main/napnux.png)

Napnux is a powerful and efficient web framework designed for [Node.js](http://nodejs.org), offering minimal overhead and impressive speed. It enables developers to create high-performance web applications with ease.

## Getting Started

To start using Napnux in your project, simply install it via [npm](https://www.npmjs.com/):

```bash
npm install napnux
```

For detailed installation instructions and more, please refer to our  [our installing guide](https://napnux.vercel.app/docs/get-started/).

## Example Usage

```javascript
const napnux = require("napnux");
const port = 3001;

napnux()
  .get("/", (req, res) => {
    res.end("Hello World");
  })
  .start(port, () => {
    console.log(`Your app is now listening on port ${port}`);
  });
```

## Features

1. High performance
2. Efficient routing
3. Intuitive app architecture
4. Command-line interface for rapid project and app generation

## Documentation

For in-depth information and usage instructions, visit our [Website and Documentation](https://napnux.vercel.app/).

## Quick Start

The easiest way to begin with Napnux is by using the command-line interface (CLI) to generate a new project. First, install Napnux globally:

```bash
npm install -g napnux
```

Then create a project with the following command:

```bash

nux create-project <projectName>
```

To start the development server, navigate to the project directory and run:

```bash
cd <projectName>
npm run dev
```

Your development server will be accessible at: http://localhost:3001.

## License

Napnux is released under the MIT License.
