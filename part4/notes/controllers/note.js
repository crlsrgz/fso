const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

notesRouter.get("/api/notes", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.statusMessage =
          "It seems the note you're looking fore is not here";

        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
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
  } catch {
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

notesRouter.delete("/api/notes/:id", (request, response) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
