/*!
 * napnux
 * Copyright(c)  Asif Ekbal
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */
const url = require("url");
const { URL } = require("url");

const http = require("http");
const path = require("path");
const Nux = require("./router");
const serveStatic = require("serve-static");
const njucks = require("./middleware/njucks.js");
const { send, redirect } = require("./response.js");
const { query, search, body } = require("./request.js");
const { slash, getbase, mutate } = require("./utils.js");
const { defaultOnNotFound, defaultOnError } = require("./errors");

/**
 * Represents the main Napnux framework class.
 * @class
 */
class Napnux extends Nux {
  constructor (opts = {}) {
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

  toRes (res) {
    res.redirect = (url) => redirect(res, url);
    res.send = (body, code) => send(res, { body, code });
  }

  toReq (req) {
    req.search = search(req);
    req.query = query(req);
  }

  /**
   * Configure the framework to serve static files.
   */
  static (root, ...args) {
    const skey = path.basename(root);
    this.use(slash(skey), serveStatic(root, ...args));
    return this;
  }

  /**
   * Configure nunjucks templating engine.
   */
  views (root, opts = {}) {
    this.use(
      njucks({
        views: root,
        ...opts
      })
    );
    return this;
  }

  handler (req, res) {
    let funcs = [];
    let arr = this.mwares;
    req.originalUrl = req.originalUrl || req.url;
    // const protocol = req.protocol;
    // const purl2 = new URL(req.url, protocol + "://" + req.headers.host);
    // console.log(purl2);
    const purl = url.parse(req.url, true);
    // console.log(purl);

    req.path = purl.pathname;
    const lkey = getbase(purl.path);
    const exists = this.find(req.method, purl.pathname);
    if (this.bmwares[lkey] !== undefined) {
      arr = arr.concat(this.bmwares[lkey]);
    }

    if (exists) {
      funcs = exists.handlers;
      req.params = exists.params;
    }

    if (this.apps[lkey] !== undefined) {
      mutate(lkey, req);
      funcs = funcs.concat(this.apps[lkey].handler.bind(null, req, res));
    }

    funcs.push(this.onNotFound);
    this.toRes(res);
    this.toReq(req);

    let i = 0;

    if (arr.length === i && funcs.length === 1) return funcs[0](req, res);

    const next = (err) => {
      if (err) {
        this.onError(err, req, res, next);
      } else {
        loop();
      }
    };

    arr = arr.concat(funcs);
    const loop = () => {
      if (!res.finished && i < arr.length) {
        arr[i++](req, res, next);
      }
    };
    loop();
  }

  /**
   * Add apps or middleware functions to the framework.
   */
  use (lkey, ...funcs) {
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
          const arr = this.bmwares[lkey] || [];
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

  add (method, path, ...funcs) {
    const lkey = slash(getbase(path));
    if (this.apps[lkey] !== undefined) {
      throw new Error(`
    Cannot add route ${method} ${path} because a app is already mounted on ${lkey}
  `);
    }
    return super.add(method, path, ...funcs);
  }

  /**
   * Start the Napnux server.
   */
  start (...args) {
    this.server = this.server || http.createServer(this.handler);
    this.server.listen(...args);
    this.use(body);
    return this;
  }
}

module.exports = (opts) => new Napnux(opts);
