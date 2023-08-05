const { pathToRegexp } = require("path-to-regexp");
class Nux {
  constructor(opts = {}) {
    this.routes = [];

    this.all = this.add.bind(this, "");
    this.get = this.add.bind(this, "GET");
    this.head = this.add.bind(this, "HEAD");
    this.patch = this.add.bind(this, "PATCH");
    this.options = this.add.bind(this, "OPTIONS");
    this.connect = this.add.bind(this, "CONNECT");
    this.delete = this.add.bind(this, "DELETE");
    this.trace = this.add.bind(this, "TRACE");
    this.post = this.add.bind(this, "POST");
    this.put = this.add.bind(this, "PUT");
  }

  add(method, route, ...fns) {
    const handlers = [...fns];
    const keys = [];
    const re = pathToRegexp(route, keys);
    const layer = { method, route, handlers, keys, re };
    this.routes.push(layer);
    return this;
  }

  use(route, ...fns) {
    handlers = [...fns];
    const keys = [];
    const re = pathToRegexp(route, keys);
    const layer = { method: "", route, handlers, keys, re };
    this.routes.push(layer);
  }

  find(method, url) {
    let params = {};
    let handlers = [];
    for (let i = 0; i < this.routes.length; i++) {
      const { method: m, re, keys: k, handlers: h } = this.routes[i];
      if (m === method) {
        if (k.length === 0) {
          const match = re.exec(url);
          if (!match) continue;
          if (match.groups !== void 0)
            for (const key in match.groups) params[key] = match.groups[key];
          h.length ? handlers.push(...h) : null;
        } else if (k.length > 0) {
          const match = re.exec(url);
          if (!match) continue;
          for (let j = 0; j < k.length; j++) {
            params[k[j].name] = match[j + 1];
          }
          h.length ? handlers.push(...h) : null;
        } else {
        }
      }
    }
    if (handlers.length > 0 || Object.keys(params).length > 0)
      return { params, handlers };
    else return false;
  }
}

module.exports = Nux;
