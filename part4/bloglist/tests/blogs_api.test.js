const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");

const BlogEntry = require("../models/blogEntry");
const User = require("../models/user");

const bcrypt = require("bcrypt");

const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const helper = require("./test_helpers");

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

test("A000 API test initial setup", () => {
    const result = 111;
    assert.strictEqual(result, 111);
});

test("A001 Return JSON Content", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test("A002 Get Entry by ID", async () => {
    const request = helper.blogs[0];
    const response = await api.get(`/api/blogs/${request._id}`);
    assert.strictEqual(response.body.title, request.title);
});

test("A003 There are three blogs", async () => {
    const response = await api.get("/api/blogs");
    const responseLength = await response.body.length;
    const initialLength = helper.blogs.length;

    assert.strictEqual(responseLength, initialLength);
});

test('A004 First entry has the address "https://reactpatterns.com/"', async () => {
    const response = await api.get("/api/blogs");
    const contents = await response.body.map((entry) => {
        return entry.url;
    });
    // assert.strictEqual(contents.includes("https://reactpatterns.com/"), true)
    assert.strictEqual(contents[0] === "https://reactpatterns.com/", true);
});

test("A005 Check id keys", async () => {
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
describe("BB000 Check database response and user creation", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash("secret", 10);
        const user = new User({ username: "root", passwordHash });

        await user.save();
    });

    test("BB102  Create Blog Entry", async () => {
        // New User
        const newUser = helper.newUser;
        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const users = await api.get("/api/users");
        const userNames = users.body.map((user) => user.username);
        assert(userNames.includes(newUser.username));

        // Login

        let loginToken = "";

        await api
            .post("/api/login")
            .send({ username: newUser.username, password: newUser.password })
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .then((data) => {
                console.log("response token===>", data.body.token);
                loginToken = data.body.token;
            });

        // Blog Entry
        const newBlogEntry = helper.newBlogEntry;

        await api
            .post("/api/blogs")
            .set("Authorization", "Bearer " + loginToken)
            .send(newBlogEntry)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        // Check number of blogs
        const response = await api.get("/api/blogs");
        assert.strictEqual(response.body.length, helper.blogs.length + 1);
    });
});

test("B001 Missing likes", async () => {
    const newBlogEntry = helper.newBlogEntryMissingLikes;

    await api
        .post("/api/blogs")
        .send(newBlogEntry)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const getLikes = response.body.filter(
        (item) => item.title === newBlogEntry.title,
    );

    assert.strictEqual(getLikes[0].likes, 0);
});

test("B002 Missing Title", async () => {
    const newBlogEntry = helper.newBlogEntryMissingTitle;
    // Expects a rejection
    await api.post("/api/blogs").send(newBlogEntry).expect(400);
});
test("B003 Missing url", async () => {
    const newBlogEntry = helper.newBlogEntryMissingUrl;
    // Expects a rejection
    await api.post("/api/blogs").send(newBlogEntry).expect(400);
});

test("C000 update title of blog", async () => {
    const newTitle = "the blog";
    const entryIndex = 0;
    const blogsDb = await helper.blogEntriesInDb();
    const blogEntryToUpdate = blogsDb[entryIndex];

    const updatedEntry = {
        title: newTitle,
        author: blogEntryToUpdate.author,
        url: blogEntryToUpdate.url,
    };

    await api.put(`/api/blogs/${blogEntryToUpdate.id}`).send(updatedEntry);

    const checkEntryInDB = await helper.blogEntriesInDb();

    assert.strictEqual(checkEntryInDB[entryIndex].title, newTitle);
});

test("D000 delete blog entry", async () => {
    const entriesAtStart = await helper.blogEntriesInDb();
    const entryToDelete = entriesAtStart[0];

    await api.delete(`/api/blogs/${entryToDelete.id}`);
    await api.get(`/api/notes/${entryToDelete.id}`).expect(404);
    console.log("D000, Status 404");

    const checkEntries = await api.get(`/api/blogs`);
    assert.strictEqual(entriesAtStart.length - 1, checkEntries.body.length);
    console.log(
        `D000 number of entries ${checkEntries.body.length}, from initial ${entriesAtStart.length} `,
    );
});

after(async () => {
    await mongoose.connection.close();
}); ////
