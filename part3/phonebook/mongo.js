// const mongoose = require("mongoose");
import mongoose from "mongoose";
const inputCommandLength = process.argv.length;

if (inputCommandLength !== 3 && inputCommandLength !== 5) {
  console.log("-------");
  console.log("You should use the command with five argments. ");
  console.log(
    "Usage -> node <file.js> <password> <contact name> <contact number> "
  );
  console.log('If there are blank spaces use "" to wrap the input');
  process.exit(1);
}

// Preparing the user input
const password = process.argv[2];
const inputedContactName = String(process.argv[3]);
const inputedContactPhone = String(process.argv[4]);

const url = `mongodb+srv://fullstack:${password}@fso-cluster.tucps.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

// ???
mongoose.set("strictQuery", false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

const Contact = mongoose.model("Contact", contactSchema);

function addNewContact() {
  const contactOne = new Contact({
    name: inputedContactName,
    phoneNumber: inputedContactPhone,
  });

  contactOne.save().then((result) => {
    console.log(`saved ${contactOne.name} to the phonebook`);
    mongoose.connection.close();
  });
}

if (inputCommandLength === 5) {
  addNewContact();
}

if (inputCommandLength === 3) {
  Contact.find({}).then((result) => {
    if (result.length < 1) {
      console.log(`-------\n"Nothing found, Phonebook is empty"\n-------\n`);
    } else {
      console.log("-------");
      console.log(
        `${result.length} ${
          result.length > 1 ? "entries were found" : "entry was found"
        }`
      );
      console.log("-------");
      result.forEach((contact) => {
        console.log("- ", contact.name, contact.phoneNumber);
      });
      console.log("-------");
    }

    mongoose.connection.close();
  });
}
