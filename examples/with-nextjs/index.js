const next = require("next");
const napnux = require("napnux");
// const napnux = require("../../index.js");

const dev = NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  napnux()
    .get("*", handler)
    .listen(3000, () => {
      console.log(`Server started on http://localhost:3000`);
    });
});
