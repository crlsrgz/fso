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

blogRouter.get("/api/blogs/:id", (request, response) => {
  BlogEntry.findById(request.params.id).then((blog) => {
    response.json(blog);
  });
});

blogRouter.post("/api/blogs", (request, response) => {
  const blog = new BlogEntry(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

blogRouter.delete("/api/blogs/:id", (request, response) => {
  BlogEntry.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
