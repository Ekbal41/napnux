const notes = require("./apps/notes");
const blogs = require("./apps/blogs");
const server = require("./ends.js");

server
  .use("/notes", notes)
  .use("/blogs", blogs)
  .static(__dirname + "/public")
  .nunjucks({
    views: __dirname + "/views",
  })
  .start(3000, () => {
    console.log("> Server Listening on http://localhost:3000");
  });
