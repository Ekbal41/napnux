const http = require("http");
const url = require("url");
var serveStatic = require("serve-static");
const Nux = require("./router/nux");
const { wslash, base, mutate } = require("./utils.js");
const parser = require("./parser.js");
const nejs = require("./middleware/nejs.js");
const nflash = require("./middleware/nflash.js");
const redirect = require("./redirect.js");
const path = require("path");

let headers = {
  "X-Frame-Options": "SAMEORIGIN",
  "X-XSS-Protection": "1; mode=block",
  "X-Content-Type-Options": "nosniff",
};

class Napnux extends Nux {
  constructor(opts = {}) {
    super(opts);
    this.apps = [];
    this.mwares = [];
    this.bmwares = [];
    this.parse = parser;
    this.server = opts.server;
    this.handler = this.handler.bind(this);
    // this.settings = {
    //   hdrs: headers,
    // };
  }

  notamid(req, res) {
    res.redirect = (url) => redirect(req, res, url);
  }

  static(root, ...args) {
    const skey = path.basename(root);
    this.use(wslash(skey), serveStatic(root, ...args));
    return this;
  }

  // set(setType, key, val) {
  //   if (setType === "header") {
  //     this.settings.hdrs[key] = val;
  //   }
  // }

  ejs(opts = {}) {
    this.use(nejs(opts));
    return this;
  }

  flash() {
    this.use(nflash());
    return this;
  }

  handler(req, res, info) {
    info = info || this.parse(req);
    let funcs = [];
    let arr = this.mwares;
    const purl = url.parse(req.url, true);
    const lkey = base((req.path = info.pathname));
    const exists = this.find(req.method, info.pathname);
    const query = Object.fromEntries(Object.entries(purl.query));
    if (this.bmwares[lkey] !== void 0) {
      arr = arr.concat(this.bmwares[lkey]);
    }

    if (exists) {
      funcs = exists.handlers;
      req.params = exists.params;
    } else if (this.apps[lkey] !== void 0) {
      mutate(lkey, req);
      info.pathname = req.path;
      funcs = funcs.concat(this.apps[lkey].handler.bind(null, req, res, info));
    }
    funcs.push(this.onNotFound);

    req.search = purl.search;
    req.query = query;
    this.notamid(req, res); //run before middlewares

    let i = 0,
      len = arr.length,
      num = funcs.length;
    if (len === i && num === 1) return funcs[0](req, res);
    let next = (err) => (err ? this.onError(err, req, res, next) : loop());
    let loop = (_) => res.finished || (i < len && arr[i++](req, res, next));
    arr = arr.concat(funcs);
    len += num;
    loop();
  }

  onNotFound(req, res) {
    res.statusCode = 404;
    res.end("Not Found0");
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

  add(method, path, ...funcs) {
    let lkey = wslash(base(path));
    if (this.apps[lkey] !== void 0) {
      throw new Error(`
    Cannot add route ${method} ${path} because a sub app is already mounted on ${lkey}
  `);
    }

    return super.add(method, path, ...funcs);
  }

  start(...args) {
    this.server = this.server || http.createServer(this.handler);
    this.server.listen(...args);
    return this;
  }
}

module.exports = (opts) => new Napnux(opts);
