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
const njucks = require("./middleware/njucks.js");

/**
 * Expose `napnux()`
 */
exports = module.exports = napnux;

/**
 * Expose constructors.
 */
exports.FSStorage = storage;
exports.flash = nflash;
exports.nunjucks = njucks;
