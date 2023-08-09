const handler = require("./handler.js");

handler
  .static(__dirname + "/public")
  .ejs({
    views: __dirname + "/views",
  })
  .start(3000, () => {
    console.log("> Server Listening on http://localhost:3000");
  });
