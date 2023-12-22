const nejs = require("./middleware/nejs");
const path = require("path");
const { body } = require("./request");
const { slash } = require("./utils");
const serveStatic = require("serve-static");

module.exports = (napnux) => {
  const userDirectory = path.dirname(require.main.filename);
  // default static and views setup
  // for projet
  const { staticDir: pstaticDir, viewsDir: pviewsDir } = napnux.settings;
  if (pstaticDir) {
    const pstaticPath = path.join(userDirectory, pstaticDir);
    defaultstatic(napnux, pstaticPath);
  }
  if (pviewsDir) {
    const pviewsPath = path.join(userDirectory, pviewsDir);
    defaultviews(napnux, pviewsPath);
  }

  // for apps
  const appKeys = Object.keys(napnux.apps);
  appKeys.forEach((appKey) => {
    const { staticDir, viewsDir, appsDir } = napnux.apps[appKey].settings;
    if (staticDir) {
      const appStaticPath = path.join(userDirectory, appsDir, appKey, staticDir);
      defaultstatic(napnux.apps[appKey], appStaticPath);
    }
    if (viewsDir) {
      const appViewsPath = path.join(userDirectory, appsDir, appKey, viewsDir);
      defaultviews(napnux.apps[appKey], appViewsPath);
    }
  });

  // default body parser with multipart support
  napnux.use(body);
};

const defaultstatic = (napnux, root, ...args) => {
  const skey = path.basename(root);
  napnux.use(slash(skey), serveStatic(root, ...args));
};

const defaultviews = (napnux, root, opts = {}) => {
  napnux.use(nejs({ views: root, ...opts }));
};
