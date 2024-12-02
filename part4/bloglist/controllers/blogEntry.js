const blogRouter = require("express").Router();

const BlogEntry = require("../models/blogEntry");

blogRouter.get("/", (request, response) => {
  response.send("<h1>Hello Blog</h1>");
});

blogRouter.get("/api/blogs", (request, response) => {
  BlogEntry.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/api/blogs", (request, response) => {
  const blog = new BlogEntry(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogRouter;
