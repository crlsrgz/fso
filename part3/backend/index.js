require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

const Note = require("./models/note");

// Middleware
app.use(express.static("build"));
app.use(express.json());
app.use(cors());

// let notes = [
//   { id: "1", content: "HTML is easy", important: true },
//   { id: "2", content: "Browser can execute only JavaScript", important: false },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true,
//   },
// ];

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response, next) => {
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

app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
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

app.delete("/api/notes/:id", (request, response) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
