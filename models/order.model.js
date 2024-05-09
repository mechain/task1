const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  warehouse: String,
  status: {
    type: String,
    enum: ["approved", "rejected", "pending"],
    default: "pending",
  },
});

const Orders = mongoose.model("order", orderSchema);

module.exports = Orders;
