const napnux = require("../../index.js");
const morgan = require("morgan");
napnux()
  .use(morgan("dev"))
  .get("/", (req, res) => {
    res.end("Morgan saying: Hello World!");
  })
  .start(3000, (req, res) => {
    console.log("Server started on http://localhost:3000");
  });
