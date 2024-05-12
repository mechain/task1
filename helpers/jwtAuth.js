const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const ApiResponse = require("./apiResponse");
const jwt = require("jsonwebtoken");

const jwtAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json(
        new ApiResponse(token, "Access Denied", StatusCodes.FORBIDDEN, false)
      );
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
    if (err) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          new ApiResponse(
            token,
            "Invalid token",
            StatusCodes.UNAUTHORIZED,
            false
          )
        );
    }
    req.body.email = result.email;
    req.body.password = result.password;
  });
  next();
};

const adminAuth = async (req, res, next) => {
  const { email } = req.body;
  const adminUser = await User.findOne({ email });
  if (!adminUser) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        new ApiResponse(email, "Invalid Email", StatusCodes.UNAUTHORIZED, false)
      );
  }
  if (adminUser.isAdmin) {
    next();
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        new ApiResponse(
          email,
          "User Is Not Admin",
          StatusCodes.UNAUTHORIZED,
          false
        )
      );
  }
};

module.exports = {
  jwtAuth,
  adminAuth,
};
