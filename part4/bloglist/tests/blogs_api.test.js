const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");

const helper = require("./test_helpers");

const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const api = supertest(app);

const blogEntry = require("../models/blogEntry");

// Clear DB and create entries for every test
beforeEach(async () => {
    await blogEntry.deleteMany({});
    console.log("cleared");

    for (let blog of helper.blogs) {
        const blogObject = new blogEntry(blog);
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
    // assert.strictEqual(contents.includes("https://reactpatterns.com/"), true);
    assert.strictEqual(contents[0] === "https://reactpatterns.com/", true);
});

after(async () => {
    await mongoose.connection.close();
});
