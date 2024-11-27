require("dotenv").config();

const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => console.log("-------\nConnection to MDB established\n-------\n"))
  .catch((error) => {
    console.log("Connection error", error.message);
  });

const contactSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true },
  number: {
    type: String,
    minLength: 3,
    validate: {
      validator: function (value) {
        return /(\d{2,3})-(\d+)$/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: true,
  },
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contact", contactSchema);
