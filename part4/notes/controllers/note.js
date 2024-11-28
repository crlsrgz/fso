const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

notesRouter.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

notesRouter.get("/api/notes/:id", (request, response, next) => {
  // Mongoose find by id
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
      // console.log("This is what happened ->", error);
      // response.status(400).end({ error: "malformatted id" });
      //next is middleware from express to handle errors
      next(error);
    });
});

notesRouter.post("/api/notes", (request, response) => {
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

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

notesRouter.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;
  // Regular Object, not created with Note constructor in module using mongoose
  const note = {
    content: body.content,
    important: body.important,
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
