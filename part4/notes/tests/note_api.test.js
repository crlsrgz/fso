const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const helper = require("./test_helper");

const mongoose = require("mongoose");

const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

/*:: Reset database and generate test data  ::*/
const Note = require("../models/note");
const note = require("../models/note");

beforeEach(async () => {
  await Note.deleteMany({});
  console.log("cleared");

  // for "pauses" at every iteration, allowinf async functionality
  // await promise all is also a solution
  for (let note of helper.initialNotes) {
    let noteObject = new Note(note);
    await noteObject.save();
    console.log("saved", note);
  }
  console.log("done");
});

/*:: TESTS ::*/

//  npm test -- --test-only
test("notes are returned as json", async () => {
  console.log("Connection and JSON");

  await api
    .get("/api/notes")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are two notes", async () => {
  const response = await api.get("/api/notes");

  assert.strictEqual(response.body.length, helper.initialNotes.length);
});

test("the first note is about HTTP methods", async () => {
  const response = await api.get("/api/notes");
  const contents = response.body.map((e) => e.content);
  assert.strictEqual(contents.includes("HTML is easy"), true);
});

test.only("a valid note can be added", async () => {
  const newNote = {
    content: "async/await simplifies making async calls",
    import: true,
  };

  await api
    .post("/api/notes")
    .send(newNote)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/notes");
  const contents = response.body.map((r) => r.content);

  assert.strictEqual(response.body.length, helper.initialNotes.length + 1);
  assert(contents.includes("async/await simplifies making async calls"));
});

test.only("note without content is not added", async () => {
  const newNote = {
    important: true,
  };

  await api.post("/api/notes").send(newNote).expect(400);

  const response = await api.get("/api/notes");

  assert.strictEqual(response.body.length, helper.initialNotes.length);
});

test.only("display an specific note", async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToView = notesAtStart[0];

  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  // Node deepStrictEqual tests if the contents are the same,
  // strictEqual uses Object.is, comparing if the objects are the same
  assert.deepStrictEqual(resultNote.body, noteToView);
});

test.only("a note can be deleted", async () => {
  const notesAtStart = await helper.notesInDb();
  const noteToDelete = notesAtStart[0];

  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204);

  const notesAtEnd = await helper.notesInDb();
  const contents = notesAtEnd.map((r) => r.content);
  assert(!contents.includes(noteToDelete.content));

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1);
});

// The after hook is guaranteed to run, even if tests within the suite fail.
after(async () => {
  await mongoose.connection.close();
});
