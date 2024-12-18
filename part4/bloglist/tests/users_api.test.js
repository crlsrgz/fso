const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");

const bcrypt = require("bcrypt");

const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const mongoose = require("mongoose");
const User = require("../models/user");

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
});

after(async () => {
    await mongoose.connection.close();
});
