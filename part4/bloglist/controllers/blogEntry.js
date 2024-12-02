const blogEntriesRouter = require("express").Router();
const BlogEntry = require("../models/blogEntry");

blogEntriesRouter.get("/", (request, response) => {
  response.send("<h1>Hello Blog</h1>");
});

blogEntriesRouter.get("/api/blogs", (request, response) => {
  BlogEntry.find({}).then((blogs) => {
    response.json(blogs);
  });
});

// blogEntriesRouter.post("/api/blogs", (request, response) => {
//   const blog = new Blog(request.body);

//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });

module.exports = blogEntriesRouter;
