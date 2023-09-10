const notes = require("./apps/notes");
const blogs = require("./apps/blogs");
const server = require("./ends.js");

let s = server
  .use("/notes", notes)
  .use("/blogs", blogs)
  // .views(__dirname + "/projectViews")
  // .static(__dirname + "/projectPublic")
  // .static(__dirname + "/public")

  
  // .set("viewsDir", "/projectViews")
  .start(3000, () => {
    console.log("> Server Listening on http://localhost:3000");
  });
