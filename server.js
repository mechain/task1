require("dotenv").config();
const express = require("express");
const connectToDB = require("./models/connectToDb");
const route = require("./routes/index");
const errorHandler = require("./helpers/errorhandler");
const { jwtAuth, adminAuth } = require("./helpers/jwtAuth");
const Warehouse = require("./models/warehouse.model");
const User = require("./models/user.model");
const mailToAdmin = require("./helpers/mail");

const app = express();

app.use(express.json());

route(app);

app.use(errorHandler);

const intervalId = setInterval(() => {
  mailToAdmin();
}, 10000);

app.listen(8080, () => {
  console.log("Server Is Connected");
  connectToDB(process.env.DB_URL);
});

app.on("close", () => {
  clearInterval(intervalId);
});
