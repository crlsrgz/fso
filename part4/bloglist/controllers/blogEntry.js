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

blogRouter.post("/api/blogs", async (request, response) => {
    const blog = await BlogEntry(request.body);

    if (!blog.likes) {
        blog.likes = 0;
    }

    if (blog.title === undefined || blog.url === undefined) {
        return response.status(400).json({
            error: "Content error, check all fields are correct",
        });
    }

    const savedEntry = blog.save();
    response.status(201).json(savedEntry);
});

blogRouter.put("/api/blogs/:id", async (request, response) => {
    const body = request.body;
    const blogEntry = {
        title: body.title,
        author: body.author,
        url: body.url,
    };

    const updatedBlogEntry = await BlogEntry.findByIdAndUpdate(
        request.params.id,
        blogEntry,
        {
            new: true,
            runValidators: false,
        },
    );
    response.json(updatedBlogEntry);
});

blogRouter.delete("/api/blogs/:id", async (request, response) => {
    await BlogEntry.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

module.exports = blogRouter;
