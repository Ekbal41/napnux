const http = require("http");
const url = require("url");
const Nux = require("../packages/nux");
const { wslash, base, mutate } = require("./utils.js");
const parser = require("../packages/parser.js");

class Napnux extends Nux {
  constructor(opts = {}) {
    super(opts);
    this.apps = [];
    this.mwares = [];
    this.bmwares = [];
    this.parse = parser;
    this.server = opts.server;
    this.handler = this.handler.bind(this);
  }
  handler(req, res, info) {
    console.log(req.url);
    let funcs = [];
    let arr = this.mwares;
    const purl = url.parse(req.url, true);
    const lkey = base((req.path = purl.pathname));
    const exists = this.find(req.method, req.url);
    const query = Object.fromEntries(Object.entries(purl.query));
    if (this.bmwares[lkey] !== void 0) {
      arr = arr.concat(this.bmwares[lkey]);
    }
    console.log(lkey, exists);
    if (exists) {
      funcs = exists.handlers;
      req.params = exists.params;
    } else if (this.apps[lkey] !== void 0) {
      mutate(lkey, req);
      funcs.push(this.apps[lkey].handler.bind(null, req, res));
    } else {
      funcs.push(this.onNotFound);
    }

    req.search = purl.search;
    req.query = query;
    if (arr.length === 0 && funcs.length === 1) {
      funcs[0](req, res);
    }

    let i = 0;
    let next = (err) => (err ? this.onError(err, req, res, next) : loop());
    let loop = (_) =>
      res.finished || (i < arr.length && arr[i++](req, res, next));

    arr.push(...funcs);
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

  use(lkey, ...funcs) {
    if (typeof lkey === "function") {
      this.mwares.push(lkey, ...funcs);
    } else if (lkey === "/") {
      this.mwares.push(...funcs);
    } else {
      lkey = base(lkey);
      funcs.forEach((func) => {
        if (func instanceof Napnux) {
          this.apps[lkey] = func;
        } else {
          let arr = this.bmwares[lkey] || [];
          if (arr.length === 0) {
            arr.push((req, res, next) => {
              mutate(lkey, req);
              next();
            });
          }
          arr.push(func);
          this.bmwares[lkey] = arr;
        }
      });
    }
    return this;
  }

  // add(method, path, ...funcs) {
  //   let lkey = wslash(base(path));
  //   if (this.apps[lkey] !== "undefined") {
  //     throw new Error(`
  //   Cannot add route ${method} ${path} because a sub app is already mounted on ${lkey}
  // `);
  //   }

  //   return super.add(method, path, ...funcs);
  // }

  start(...args) {
    this.server = this.server || http.createServer(this.handler);
    this.server.listen(...args);
  }
}

module.exports = (opts) => new Napnux(opts);
