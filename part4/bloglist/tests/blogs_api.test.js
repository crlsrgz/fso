const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");

const helper = require("./test_helpers");

const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const api = supertest(app);

const BlogEntry = require("../models/blogEntry");

// Clear DB and create entries for every test
beforeEach(async () => {
    await BlogEntry.deleteMany({});
    console.log("cleared");

    for (let blog of helper.blogs) {
        const blogObject = new BlogEntry(blog);
        await blogObject.save();
        // console.log("saved", blogObject);
    }

    console.log("done");
});

test("API test initial setup", () => {
    const result = 111;
    assert.strictEqual(result, 111);
});

test.only("Return JSON Content", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test.only("There are three blogs", async () => {
    const response = await api.get("/api/blogs");
    const responseLength = await response.body.length;
    const initialLength = helper.blogs.length;

    assert.strictEqual(responseLength, initialLength);
});

test.only('First entry has the address "https://reactpatterns.com/"', async () => {
    const response = await api.get("/api/blogs");
    const contents = await response.body.map((entry) => {
        return entry.url;
    });
    // assert.strictEqual(contents.includes("https://reactpatterns.com/"), true)
    assert.strictEqual(contents[0] === "https://reactpatterns.com/", true);
});

test("Check id keys", async () => {
    // Get the entries,
    // - map to get the keys of every entry,
    // - map to get just the if the id is included
    // - set a boolean
    const response = await api.get("/api/blogs");
    const entriesKeys = response.body.map((item) => Object.keys(item));
    const includesIdKey = entriesKeys.map((item) => item.includes("id"));
    //
    const idIsKey =
        includesIdKey.includes(false) ||
        entriesKeys.length !== includesIdKey.length
            ? false
            : true;
    // console.log("=====>", entriesKeys, includesIdKey);
    assert.strictEqual(idIsKey, true);
});

test("Create Note", async () => {
    const newBlogEntry = {
        title: "Test Post",
        author: "John Doe",
        url: "http://www.john.somepage",
        likes: 5,
    };

    await api
        .post("/api/blogs")
        .send(newBlogEntry)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const contents = response.body.map((res) => res.url);

    assert.strictEqual(response.body.length, helper.blogs.length + 1);
    assert(contents.includes("http://www.john.somepage"));
});

test("Missing likes", async () => {
    const response = await api.get("/api/blogs");
    const contents = response.body;

    for (let entry of contents) {
        if (!entry.likes) {
            entry.likes = 0;
        }
    }

    const likesArray = contents.map((entry) => {
        return entry.likes !== undefined;
    });

    assert.strictEqual(likesArray.includes(false), false);
});

after(async () => {
    await mongoose.connection.close();
});
