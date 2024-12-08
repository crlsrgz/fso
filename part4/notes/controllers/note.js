const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

notesRouter.get("/api/notes", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get("/api/notes/:id", async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(400).end();
    }
  } catch (exception) {
    next(exception);
  }
});

notesRouter.post("/api/notes", (request, response, next) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  });

  try {
    const savedNote = note.save();
    response.status(201).json(savedNote);
  } catch (exception) {
    next(exception);
  }
});

notesRouter.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;
  // Regular Object, not created with Note constructor in module using mongoose

  console.log(content);
  const note = {
    content: content,
    important: important,
  };
  //updatedNote is the original parameter,
  // but adding {new:true} valls the event handler with then new modified document.
  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

notesRouter.delete("/api/notes/:id", async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = notesRouter;
