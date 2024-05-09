const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET);
};

module.exports = generateToken;
