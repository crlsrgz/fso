require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

//Mongoose setup
const Contact = require("./models/person");

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

// Morgan, console messages
morgan.token("reqBody", function (request, _) {
  return JSON.stringify(request.body);
});

app.use(
  morgan(
    ":remote-addr - :remote-user [:date[clf]] :reqBody :method :url HTTP/:http-version :status :res[content-length]"
  )
);

// Error and Endpoint middleware declaration

function errorHandler(error, request, response, next) {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "The query format is wrong" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
}

function unknownEndPoint(request, response) {
  response.status(404).send({ error: "unknown endpoint" });
}

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
];

app.get("/api/persons", (request, response) => {
  Contact.find({}).then((contacts) => {
    response.json(contacts);
  });
});

app.get("/", (request, response) => {
  response.send("Run serv");
});

app.get("/info", (request, response) => {
  Contact.find({}).then((contacts) => {
    const numberOfContacts = contacts.length;
    const requestDate = new Date();
    response.send(`<p>Phonebook has info for <b>${numberOfContacts}</b> people,</p>
    <p>${requestDate}</p>`);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Contact.findById(id)
    .then((contact) => {
      if (contact) {
        response.json(contact);
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

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  if (body.content === undefined) {
    return response.status(400).json({
      error:
        "Content error, the name and the number should have at least three characters",
    });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact
    .save()
    .then((result) => {
      console.log("saved a contact", result);
    })
    .catch((error) => next(error));

  /**
   * @todo close connections
   */
  Contact.find({}).then((contacts) => {
    persons = contacts;
    response.json(contacts);
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  // console.log(body);
  // console.log(request.params.id);

  // new object, not from Contact constructor
  const contact = {
    name: body.name,
    number: body.number,
  };

  Contact.findByIdAndUpdate(
    request.params.id,
    contact,
    { new: true },
    { runValidators: true }
  )
    .then((updatedContact) => {
      console.log(updatedContact);
      response.json(updatedContact);
    })
    .catch((error) => {
      next(error);
    });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Contact.findByIdAndDelete(id)
    .then((result) => {
      response.status(204).end;
    })
    .catch((error) => next(error));
});

const PORT = 3001;
app.listen(3001, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error and Endpoint middleware call
app.use(unknownEndPoint);
app.use(errorHandler);
