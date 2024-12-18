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
// TODO Static folder?
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/", blogRouter);
app.use("/", userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
