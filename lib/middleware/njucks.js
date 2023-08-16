const path = require("path");
const nunjucks = require("nunjucks");

module.exports = function jucks({
  views: globalViews = path.join(process.cwd(), "views"),
  ext: globalExt = "njk",
  contentType: globalContentType = "text/html",
  status: globalStatus = 200,
  options: globalOptions = {},
} = {}) {
  return function (req, res, next) {
    res.render = function (
      file,
      data,
      {
        ext = globalExt,
        views = globalViews,
        contentType = globalContentType,
        status = globalStatus,
        options = globalOptions,
      } = {}
    ) {
      if (isNaN(status)) throw new Error("Status code must be a number.");
      if (typeof file !== "string") throw new Error("File must be a string.");
      if (!file.endsWith(`.${ext}`)) file = file + `.${ext}`;
      //configure nunjucks
      let env = nunjucks.configure(views, options);
      // render file via nunjucks

      try {
        res.setHeader("Content-Type", contentType);
        res.statusCode = status;
        res.end(env.render(path.join(views, file), data));
      } catch (e) {
        res.statusCode = 500;
        throw new Error(e);
      }
    };
    next();
  };
};
