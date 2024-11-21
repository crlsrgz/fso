const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => console.log("connected to mongo"))
  .catch((error) => {
    console.log("error connection", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// transform _id (is an object to a string) and assign then value to an id key
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    // console.log(typeof returnedObject._id);
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema);
