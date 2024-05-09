const express = require("express");
const signupController = require("../controller/signup");
const loginController = require("../controller/login");

const route = express.Router();

route.post("/signup", signupController);
route.post("/login", loginController);

module.exports = route;
