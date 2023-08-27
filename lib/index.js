/*!
 * napnux
 * Copyright(c)  Asif Ekbal
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

const storage = require("./storage.js");
const napnux = require("./napnux.js");
const nflash = require("./middleware/nflash.js");
const nejs = require("./middleware/nejs.js");

/**
 * Expose `napnux()`
 */
exports = module.exports = napnux;

/**
 * Expose constructors.
 */
exports.FSStorage = storage;
exports.flash = nflash;
exports.ejs = nejs;
