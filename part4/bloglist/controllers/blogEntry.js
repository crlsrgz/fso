const blogRouter = require("express").Router();

const BlogEntry = require("../models/blogEntry");

blogRouter.get("/", (request, response) => {
    response.send("<h1>Hello Blog</h1>");
});

blogRouter.get("/api/blogs", async (request, response) => {
    const blogs = await BlogEntry.find({});
    response.json(blogs);
});

blogRouter.get("/api/blogs/:id", async (request, response) => {
    const blog = await BlogEntry.findById(request.params.id);
    response.json(blog);
});

blogRouter.post("/api/blogs", (request, response) => {
    const blog = new BlogEntry(request.body);

    if (!blog.likes) {
        blog.likes = 0;
    }

    if (blog.title === undefined || blog.url === undefined) {
        return response.status(400).json({
            error: "Content error, check all fields are correct",
        });
    }

    blog.save().then((result) => {
        response.status(201).json(result);
    });
});

blogRouter.put("/api/blogs/:id", (request, response, next) => {
    const body = request.body;
    const blogEntry = {
        title: body.title,
        author: body.author,
        url: body.url,
    };

    BlogEntry.findByIdAndUpdate(request.params.id, blogEntry, {
        new: true,
        runValidators: false,
    })
        .then((updateBlogEntry) => {
            console.log(updateBlogEntry);
            response.json(updateBlogEntry);
        })
        .catch((error) => {
            next(error);
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
