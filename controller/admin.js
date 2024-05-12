const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model");
const ApiResponse = require("../helpers/apiResponse");
const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs');
const generateToken = require("../helpers/generateToken");

const adminController = {
  signUp: async (req, res) => {
    const { firstname, lastname, email, password, phone } = req.body;
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
        isAdmin: true,
        userListing: "approved",
        accountStatus: "active",
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
  },
  login: async (req, res) => {
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
            { token, isAdmin: true },
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
  },
};

const getUserList = async (req, res) => {
  try {
    const userList = await User.find({ isAdmin: false }, { email: 1, firstname: 1, lastname: 1, accountStatus: 1, userListing: 1 });
    return res
      .status(StatusCodes.OK)
      .json(new ApiResponse(userList, "User List", StatusCodes.OK, true));
  } catch (e) {
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

const userApproval = async (req, res) => {
  const { userId, userListing } = req.body;
  if (!userId) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        new ApiResponse(
          error.message,
          "Please Provide userID",
          StatusCodes.BAD_REQUEST,
          false
        )
      );
  }
  const updatedUser = await User.findOneAndUpdate(
    {
      _id: mongoose.Schema.ObjectId(userId),
    },
    {
      userListing,
    },
    {
      upsert: false,
    }
  );

  res
    .status(StatusCodes.ACCEPTED)
    .json(new ApiResponse(updatedUser, "User Approved", StatusCodes.OK, true));
};

const accountStatus = async (req, res) => {
  const { userId, userListing } = req.body;
  if (!userId) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        new ApiResponse(
          error.message,
          "Please Provide userID",
          StatusCodes.BAD_REQUEST,
          false
        )
      );
  }
  const statusChanged = await User.findOneAndUpdate(
    {
      _id: mongoose.Schema.ObjectId(userId),
    },
    {
      userListing,
    },
    {
      upsert: false,
    }
  );

  res
    .status(StatusCodes.ACCEPTED)
    .json(
      new ApiResponse(
        statusChanged,
        "User Status Changed!!!!",
        StatusCodes.OK,
        true
      )
    );
};

const searchUser = async (req, res) => {
  const { type, value } = req.body;
  const searchQuery = {
    [type]: type === "phone" ? value : { $regex: value, options: i },
  };
  const userData = await User.find(searchQuery);
  res
    .status(StatusCodes.OK)
    .json(new ApiResponse(userData, "List of users", StatusCodes.OK, true));
};

module.exports = {
  login: adminController.login,
  signUp: adminController.signUp,
  getUserList,
  userApproval,
  accountStatus,
  searchUser,
};
