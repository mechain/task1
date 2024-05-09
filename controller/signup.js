const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const ApiResponse = require("../helpers/apiResponse");
const StatusCodes = require("http-status-codes").StatusCodes;

const signupController = async (req, res) => {
  const { firstname, lastname, email, password, phone, isAdmin } = req.body;
  try {
    const userExist = await User.findOne({
      email: req.body.email.toLowerCase(),
    });

    if (userExist !== null) {
      return res
        .status(200)
        .json({ message: "user already exists with this email!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
      phone,
      isAdmin: false,
      userListing: "pending",
      accountStatus: "pending",
    });

    return res
      .status(StatusCodes.CREATED)
      .json(
        new ApiResponse(
          user,
          "User registered successfully.",
          StatusCodes.CREATED,
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

module.exports = signupController;
