const { StatusCodes } = require("http-status-codes");
const ApiResponse = require("../helpers/apiResponse");
const Warehouse = require("../models/warehouse.model");
const Orders = require("../models/order.model");

const createOrder = async (req, res) => {
  const { warehouse, productName, quantity } = req.body;
  const nearWarehouse = await Warehouse.find({
    location: {
      $near: {
        $geometry: "location",
        $maxDistance: 10000,
      },
    },
  });
  if (!nearWarehouse.find((e) => e.name === warehouse)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        new ApiResponse(
          "",
          "Location of warehouse is beyond 10 km range!!",
          StatusCodes.BAD_REQUEST,
          false
        )
      );
  }

  const newOrder = await Orders.create([
    {
      product: productName,
      quantity,
      status: "pending",
      warehouse,
    },
  ]);
};

const addProduct = async (req, res) => {
  const { location, name, products } = req.body;
  const createProduct = await Warehouse.findOneAndUpdate(
    { name },
    {
      location,
      name,
      products,
    },
    {
      upsert: true,
    }
  );
  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(createProduct, "Product Added", StatusCodes.OK, true)
    );
};

const changeOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;
  const updatedOrder = await Orders.findOneAndUpdate(
    { _id: orderId },
    {
      status,
    }
  );
  if (!updatedOrder) {
    return res
      .status(StatusCodes.CONFLICT)
      .json(
        new ApiResponse("", "Product Doesn't Exist", StatusCodes.CONFLICT, true)
      );
  }
  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        updatedOrder,
        "Product Status Updated!!",
        StatusCodes.OK,
        true
      )
    );
};

module.exports = { createOrder, addProduct, changeOrderStatus };
