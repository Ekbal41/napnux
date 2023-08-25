const url = require("url");

module.exports = {
  query: (req) => {
    const purl = url.parse(req.url, true);
    return Object.fromEntries(Object.entries(purl.query));
  },
  search: (req) => {
    const purl = url.parse(req.url, true);
    return purl.search;
  },
  body: async (req, res, next) => {
    const requestBody = await collectRequestBody(req);
    const data = Object.fromEntries(new URLSearchParams(requestBody));
    req.body = data;
    next();
  },
};

const collectRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let requestBody = "";
    req.on("data", (chunk) => {
      requestBody += chunk;
    });
    req.on("end", () => {
      resolve(requestBody);
    });
    req.on("error", (error) => {
      reject(error);
    });
  });
};
