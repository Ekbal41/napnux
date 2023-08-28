const https = require("https");
const napnux = require("../../index.js");

const sslopts = {
  key: "key here",
  cert: "cert here",
};

const { handler } = napnux().get("/", (req, res) => {
  res.end("Https saying: Hello World!");
});

https.createServer(sslopts, handler).listen(3000, (_) => {
  console.log(`Server started on https://localhost:3000`);
});
