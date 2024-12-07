const { test, after } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");

const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("notes are returned as json", async () => {
  console.log("Connection and JSON");

  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two notes", async () => {
  const response = await api.get("/api/notes");
  assert.strictEqual(response.body.length, 2);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");
  const contents = response.body.map((e) => e.content);
  console.log("contents", contents);
  assert.strictEqual(contents.includes("HTML is easy"), true);
});

after(async () => {
  await mongoose.connection.close();
});
// The after hook is guaranteed to run, even if tests within the suite fail.
