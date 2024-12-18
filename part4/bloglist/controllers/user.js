const bcrypt = require("bcrypt");
const userRouter = require("express").Router();

const User = require("../models/user");

userRouter.post("/api/users", async (request, response) => {
    const { username, name, password } = request.body;

    /**
     * Handle mission content
     */
    if (username === undefined) {
        return response.status(400).json({ error: "username missing" });
    } else if (password === undefined) {
        return response.status(400).json({ error: "password missing" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
});

userRouter.get("/api/users", async (request, response) => {
    const users = await User.find({});
    response.json(users);
});

module.exports = userRouter;
