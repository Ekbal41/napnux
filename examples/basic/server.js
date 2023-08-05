const notes = require("./apps/notes");
const blogs = require("./apps/blogs");
const root = require("./root.js");

root
  .use("/notes", notes)
  .use("/blogs", blogs)
  .static(__dirname + "/public")
  .ejs({
    views: __dirname + "/views",
  })
  .start(3000, () => {
    console.log("> Server Listening on http://localhost:3000");
  });
