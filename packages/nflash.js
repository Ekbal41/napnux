const mache = require("memory-cache");

module.exports = () => {
  return (req, res, next) => {
    if (req.flash) {
      return next();
    } else {
      req.flash = flash;
      return next();
    }
  };
};

function flash(type, msg) {
  if (this.session !== void 0) {
    this.session.flash = this.session.flash || {};
    if (type && msg) {
      this.session.flash[type] = msg;
      return this.session.flash[type];
    } else if (type && !msg) {
      let arr = this.session.flash[type];
      delete this.session.flash[type];
      return arr;
    } else {
      return this.session.flash;
    }
  } else {
    if (type && msg) {
      mache.put(type, msg);
      return mache.get(type);
    } else if (type && !msg) {
      let arr = mache.get(type);
      mache.del(type);
      return arr;
    } else {
      return mache.keys();
    }
  }
}
