// Packages
const config = require("./utils/config");

const express = require("express");
const app = express();
const cors = require("cors");

const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const blogEntriesRouter = require("./controllers/blogEntry");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
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
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/", blogEntriesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;