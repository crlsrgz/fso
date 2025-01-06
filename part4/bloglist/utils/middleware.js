const logger = require("./logger");

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method);
    logger.info("Path:", request.path);
    logger.info("Body:", request.body);
    logger.info("---");
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ errror: "Unknown unknownEndpoint" });
};

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ erros: "malformatted id" });
    } else if (error.name === "ValidationdError") {
        return response.status(400).json({ error: error.message });
    }
    next(error);
};

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer")) {
        // return authorization.replace("Bearer ", "");
        request.token = authorization.replace("Bearer ", "");
    } else {
        // return null;
        request.token = null;
    }
    next();
};

const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userExtractor = async (request, response, next) => {
    if (request.token) {
        const getToken = await request.token;
        // console.log("que token => ", getToken);
        const decodedToken = await jwt.verify(getToken, process.env.SECRET);
        console.log("decodedToken", decodedToken);

        if (!decodedToken.id) {
            return response.status(404).json({ error: "token invalid" });
        }

        const user = await User.findById(decodedToken.id);
        request.user = user._id.toString();
    } else {
        request.user = null;
    }

    next();
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
};
