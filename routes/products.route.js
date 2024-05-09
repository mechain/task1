const route = require("express").Router();

const {
  createOrder,
  addProduct,
  changeOrderStatus,
} = require("../controller/product");
const { adminAuth } = require("../helpers/jwtAuth");

route.post("/create_order", createOrder);
route.post("/add_product", adminAuth, addProduct);
route.post("/change_product_status", adminAuth, changeOrderStatus);

module.exports = route;
