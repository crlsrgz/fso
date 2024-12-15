const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const helper = require("./test_helper");
const User = require("../models/user");

//...

describe("AA000 when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    // console.log("===> ", usernames, usersAtEnd);

    assert(usernames.includes(newUser.username));
  });
});
//
// The after hook is guaranteed to run, even if tests within the suite fail.
after(async () => {
  await mongoose.connection.close();
});
