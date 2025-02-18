require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI =
    process.env.NODE_ENV === "test"
        ? process.env.TEST_MONGODB_URI
        : process.env.MONGODB_URI;
if (process.env.NODE_ENV === "test") {
    console.log("Running backend in TEST env");
}
module.exports = {
    MONGODB_URI,
    PORT,
};
