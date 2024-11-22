require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

//Mongoose setup
const Contact = require("./models/person");

const app = express();

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

morgan.token("reqBody", function (request, _) {
  return JSON.stringify(request.body);
});

app.use(
  morgan(
    ":remote-addr - :remote-user [:date[clf]] :reqBody :method :url HTTP/:http-version :status :res[content-length]"
  )
);

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

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.statusMessage = "Hey, that person is not here.";
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  // if (persons.find((person) => person.name === body.name)) {
  //   return response.status(400).json({
  //     error: `name must be unique. ${body.name} already exists`,
  //   });
  // }

  contact.save().then((result) => {
    console.log("saved a contact", result);
  });

  // const person = {
  //   name: body.name,
  //   number: body.number,
  //   id: generateId(),
  // };

  // persons = persons.concat(person);
  // response.statusMessage = `Hey, ${person.name} has been added`;
  // response.json(person);

  /**
   * @todo close connections
   */
  Contact.find({}).then((contacts) => {
    persons = contacts;
    response.json(contacts);
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
