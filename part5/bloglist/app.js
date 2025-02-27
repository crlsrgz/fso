// Packages
const config = require("./utils/config");

const express = require("express");
const app = express();
const cors = require("cors");

require("express-async-errors");

const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blogEntry");
const logger = require("./utils/logger");

const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const mongoose = require("mongoose");

// // mongoose.set("strictQuery", false);
logger.info("connecting to:", config.MONGODB_URI);

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("connected to Mongo");
    })
    .catch((error) => {
        logger.error("error connecting to Monogo:", error.message);
    });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use("/", blogRouter);
app.use("/", userRouter);
app.use("/", loginRouter);

if (process.env.NODE_ENV === "test") {
    const testingRouter = require("./controllers/testing");
    app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
