const http = require("http");
const Nux = require("../packages/nux");
const url = require("url");

class Napnux extends Nux {
  constructor(opts = {}) {
    super(opts);
    this.apps = [];
    this.mwares = [];
    this.bmwares = [];
    this.server = opts.server;
    this.handler = this.handler.bind(this);
  }
  handler(req, res) {
    let funcs = [];
    let allfuncs = [];
    const purl = url.parse(req.url, true);
    const query = Object.fromEntries(Object.entries(purl.query));
    const exists = this.find(req.method, purl.pathname);
    if (exists) {
      funcs = exists.handlers;
      req.params = exists.params;
    } else {
      funcs.push(this.onNotFound);
    }

    req.search = purl.search;
    req.query = query;
    allfuncs.push(...funcs);
    if (funcs.length === 1) {
      funcs[0](req, res);
    }
    const next = (err) => {
      if (err) {
        this.onError(err, req, res, next);
      } else {
        loop();
      }
    };
    let i = 0;
    let loop = () => {
      while (!res.finished && i < allfuncs.length) {
        allfuncs[i](req, res, next);
        i++;
      }
    };
    loop();
  }

  onNotFound(req, res) {
    res.statusCode = 404;
    res.end("Not Found");
  }
  onError(err, req, res, next) {
    res.statusCode = 500;
    res.end("Internal Server Error");
  }

  start(...args) {
    this.server = this.server || http.createServer(this.handler);
    this.server.listen(...args);
  }
}

module.exports = (opts) => new Napnux(opts);
