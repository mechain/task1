const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: String,
  quantity: Number,
});

const warehouseSchema = new mongoose.Schema({
  products: [productSchema],
  name: String,
  location: {
    type: [Number, Number],
  },
});

warehouseSchema.index({ location: "2dsphere" });

const Warehouse = mongoose.model("warehouse", warehouseSchema);

module.exports = Warehouse;
