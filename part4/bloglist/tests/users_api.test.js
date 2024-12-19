const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");

const bcrypt = require("bcrypt");

const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const mongoose = require("mongoose");
const User = require("../models/user");

const helper = require("./test_helpers");

describe("AB000 initial tests", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash("secret", 10);
        const user = new User({ username: "root", passwordHash });

        await user.save();
    });

    test("AB001 check", async () => {
        // const users = await api.get("/api/users");
        // console.log("===>", users.body);
        // assert(true);
        await api
            .get("/api/users")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("AB002 create user", async () => {
        const newUser = helper.newUser;
        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const users = await api.get("/api/users");
        const userNames = users.body.map((user) => user.username);

        assert(userNames.includes(newUser.username));
    });

    test("AB003 invalid user is not added", async () => {
        const newUser = helper.newInvalidUser;
        await api.post("/api/users").send(newUser).expect(400);

        const users = await api.get("/api/users");
        const userNames = users.body.map((user) => user.username);

        assert.strictEqual(userNames.length, 1);
    });
});

after(async () => {
    await mongoose.connection.close();
});
