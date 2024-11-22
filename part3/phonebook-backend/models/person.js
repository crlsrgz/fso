require("dotenv").config();

const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then((resulr) =>
    console.log(`-------\nConnection to MDB established\n-------\n`)
  )
  .catch((error) => {
    console.log("Connection error", error.message);
  });

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contact", contactSchema);
