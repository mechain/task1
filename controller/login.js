const User = require("../models/user.model");
const ApiResponse = require("../helpers/apiResponse");
const StatusCodes = require("http-status-codes").StatusCodes;
const bcrypt = require("bcryptjs");
const generateToken = require("../helpers/generateToken");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const userInfo = await User.findOne({
    email: email,
  });
  if (!userInfo) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json(
        new ApiResponse(null, "User not found.", StatusCodes.NOT_FOUND, false)
      );
  }
  const userPassverify = await bcrypt.compare(password, userInfo.password);
  if (!userPassverify) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        new ApiResponse(
          null,
          "Invalid password.",
          StatusCodes.UNAUTHORIZED,
          false
        )
      );
  }

  if (userInfo.accountStatus !== "active") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(
        new ApiResponse(
          null,
          "User Not Active. Talk to Admin",
          StatusCodes.UNAUTHORIZED,
          false
        )
      );
  }

  try {
    const payload = {
      email: userInfo.email,
      password: userInfo.password,
    };

    const token = generateToken(payload);

    res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          token,
          "You are logged in successfully!!!",
          StatusCodes.OK,
          true
        )
      );
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        new ApiResponse(
          error.message,
          "Something went wrong.",
          StatusCodes.INTERNAL_SERVER_ERROR,
          false
        )
      );
  }
};

module.exports = loginController;
