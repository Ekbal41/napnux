const path = require("path");
const ejs = require("ejs");

module.exports = function nejs(options) {
  options = options || {};
  const ext = options.ext || "ejs";
  const views = options.views || path.join(process.cwd(), "views");
  const cache = options.cache || process.env.NODE_ENV === "production";
  const status = options.status || 200;
  const contentType = options.contentType || "text/html";

  return function nejs(req, res, next) {
    res.render = function render(file, locals, renderOptions) {
      locals = locals || {};
      renderOptions = renderOptions || {};

      const localExt = renderOptions.ext || ext;
      const localViews = renderOptions.views || views;
      const localCache = renderOptions.cache || cache;
      const localStatus = renderOptions.status || status;
      const localContentType = renderOptions.contentType || contentType;

      const options = Object.assign({}, renderOptions.options);
      options.cache = localCache;

      if (isNaN(localStatus)) {
        throw new Error("Status must be a number.");
      }

      if (typeof file !== "string") {
        throw new Error("File must be a string.");
      }

      if (!file.endsWith(`.${localExt}`)) {
        file = file + `.${localExt}`;
      }

      ejs.renderFile(
        path.join(localViews, file),
        locals,
        options,
        (err, html) => {
          if (err) {
            throw err;
          }

          res.writeHead(localStatus, { "Content-Type": localContentType });
          res.end(html);
        }
      );
    };

    return next();
  };
};
