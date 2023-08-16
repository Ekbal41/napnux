const url = require("url");
const http = require("http");
const serveStatic = require("serve-static");
const Nux = require("./router/nux");
const nejs = require("./middleware/nejs.js");
const njucks = require("./middleware/njucks.js");
const nflash = require("./middleware/nflash.js");
const redirect = require("./redirect.js");
const path = require("path");
const { slash, getbase, mutate } = require("./utils.js");
const { defaultOnNotFound, defaultOnError } = require("./errors");

class Napnux extends Nux {
  constructor(opts = {}) {
    super(opts);
    this.apps = [];
    this.mwares = [];
    this.bmwares = [];
    this.logger = opts.logger;
    this.server = opts.server;
    this.handler = this.handler.bind(this);
    this.onError = opts.onError || defaultOnError;
    this.onNotFound = opts.onNotFound || defaultOnNotFound;
  }

  notamid(req, res) {
    res.redirect = (url) => redirect(req, res, url);
  }

  static(root, ...args) {
    const skey = path.basename(root);
    this.use(slash(skey), serveStatic(root, ...args));
    return this;
  }

  ejs(opts = {}) {
    this.use(nejs(opts));
    return this;
  }

  nunjucks(opts = {}) {
    this.use(njucks(opts));
    return this;
  }

  flash() {
    this.use(nflash());
    return this;
  }

  handler(req, res) {
    let funcs = [];
    let arr = this.mwares;
    req.originalUrl = req.originalUrl || req.url;
    const purl = url.parse(req.url, true);
    req.path = purl.pathname;
    const lkey = getbase(purl.path);
    const exists = this.find(req.method, purl.pathname);
    const query = Object.fromEntries(Object.entries(purl.query));

    if (this.bmwares[lkey] !== void 0) {
      arr = arr.concat(this.bmwares[lkey]);
    }

    if (exists) {
      funcs = exists.handlers;
      req.params = exists.params;
    }

    if (this.apps[lkey] !== void 0) {
      mutate(lkey, req);
      funcs = funcs.concat(this.apps[lkey].handler.bind(null, req, res));
    }

    funcs.push(this.onNotFound);
    req.search = purl.search;
    req.query = query;
    this.notamid(req, res); //before middlewares

    let i = 0;

    if (arr.length === i && funcs.length === 1) return funcs[0](req, res);

    let next = (err) => {
      if (err) {
        this.onError(err, req, res, next);
      } else {
        loop();
      }
    };

    arr = arr.concat(funcs);
    let loop = () => {
      if (!res.finished && i < arr.length) {
        arr[i++](req, res, next);
      }
    };
    loop();
  }

  use(lkey, ...funcs) {
    if (typeof lkey === "function") {
      this.mwares.push(lkey, ...funcs);
    } else if (lkey === "/") {
      this.mwares.push(...funcs);
    } else {
      lkey = getbase(lkey);
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
    let lkey = slash(getbase(path));
    if (this.apps[lkey] !== void 0) {
      throw new Error(`
    Cannot add route ${method} ${path} because a app is already mounted on ${lkey}
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
