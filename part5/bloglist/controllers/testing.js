const router = require("express").Router();
const BlogEntry = require("../models/blogEntry");
const User = require("../models/user");

router.get("/reset", async (request, response) => {
    // await BlogEntry.deleteMany({});
    // await User.deleteMany({});
    console.log("Testing API");
    response.send("<h1>Testing</h1>");
    response.status(204).end();
});

router.post("/reset", async (request, response) => {
    await BlogEntry.deleteMany({});
    await User.deleteMany({});

    console.log("Reset Testing API");
    response.status(204).end();
});

module.exports = router;
