const blogRouter = require("express").Router();

const BlogEntry = require("../models/blogEntry");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

function getTokenFrom(request) {
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer")) {
        return authorization.replace("Bearer ", "");
    }
    return null;
}

blogRouter.get("/", (request, response) => {
    response.send("<h1>Hello Blog</h1>");
});

blogRouter.get("/api/blogs", async (request, response) => {
    // const blogs = await BlogEntry.find({});
    const blogs = await BlogEntry.find({}).populate("user", {
        username: 1,
        name: 1,
    });
    response.json(blogs);
});

blogRouter.get("/api/blogs/:id", async (request, response) => {
    const blog = await BlogEntry.findById(request.params.id);
    response.json(blog);
});

blogRouter.post("/api/blogs", async (request, response) => {
    const blog = request.body;
    if (!request.token) {
        return response.status(401).json({ error: "Token not provided" });
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    // const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    if (!blog.likes) {
        blog.likes = 0;
    }

    if (blog.title === undefined || blog.url === undefined) {
        return response.status(400).json({
            error: "Content error, check all fields are correct",
        });
    }

    const newEntryBlog = new BlogEntry({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: user.id,
    });

    const savedEntry = await newEntryBlog.save();

    user.blogs = user.blogs.concat(savedEntry._id);
    await user.save();

    response.status(201).json(savedEntry);
});

blogRouter.put("/api/blogs/:id", async (request, response) => {
    const body = request.body;
    console.log("check one");

    const blogEntry = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    };

    const updatedBlogEntry = await BlogEntry.findByIdAndUpdate(
        body.id,
        blogEntry,
        {
            new: true,
            runValidators: false,
        },
    );
    response.json(updatedBlogEntry);
});

blogRouter.delete("/api/blogs/:id", async (request, response) => {
    // Autorization
    // const decodedToken = jwt.verify(request.token, process.env.SECRET);

    // if (!decodedToken.id) {
    //     return response.status(404).json({ error: "token invalid" });
    // }

    // Compare user id from blog entry and from token
    // const user = await User.findById(decodedToken.id);
    const blog = await BlogEntry.findById(request.params.id);

    // if (blog.user.toString() !== user._id.toString()) {
    //     return;
    // }
    // console.log("=====> req.user", request.user);
    if (blog.user.toString() !== request.user) {
        return;
    }
    console.log("requestUser ===> ", request.user);

    await BlogEntry.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

module.exports = blogRouter;
