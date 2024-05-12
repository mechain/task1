require("dotenv").config();
const express = require("express");
const connectToDB = require("./models/connectToDb");
const route = require("./routes/index");
const errorHandler = require("./helpers/errorhandler");
const mailToAdmin = require("./helpers/mail");
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
  origin: "*"
}))

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
