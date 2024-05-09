const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("./apiResponse");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(
      new ApiResponse(
        error.message,
        "Something went wrong.",
        StatusCodes.INTERNAL_SERVER_ERROR,
        false
      )
    );
};

module.exports = errorHandler;
