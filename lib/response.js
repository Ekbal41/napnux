/*!
 * napnux
 * Copyright(c)  Asif Ekbal
 * MIT Licensed
 */
"use strict";

/**
 * Module dependencies.
 */
const { green, red } = require("colorette");

module.exports = {
  /**
   * Send a response to the client.
   */
  send: (res, { body, code }) => {
    let chunk = body;

    if (body !== undefined && code !== undefined) {
      if (typeof body !== "number" && typeof code === "number") {
        res.statusCode = code;
        chunk = body;
      } else {
        throw new Error(`
          Use ${green("res.send(body, statusCode)")} instead of ${red(
          "res.send(statusCode, body)"
        )}
          `);
      }
    }
    switch (typeof chunk) {
      case "string":
        res.setHeader("Content-Type", "text/plain");
        break;
      case "object":
      case "boolean":
        if (chunk === null) {
          chunk = "";
        } else if (Buffer.isBuffer(chunk)) {
          res.setHeader("Content-Type", "application/octet-stream");
        } else {
          res.setHeader("Content-Type", "application/json");
          chunk = JSON.stringify(chunk);
        }
        break;
    }

    res.end(chunk);
  },

  /**
   * Redirect to a different URL.
   */
  redirect: (res, url) => {
    if (!url) {
      throw new TypeError("argument url is required to res.redirect");
    }
    res.statusCode = 302;
    res.writeHead(302, { Location: url });
    res.end();
  }
};
