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

/**
 * Expose `napnux()`
 */
exports = module.exports = napnux;

/**
 * Expose constructors.
 */
exports.FSStorage = storage;
