const User = require("../models/user.model");
const Warehouse = require("../models/warehouse.model");

const mailToAdmin = async () => {
  const admins = await User.find({ isAdmin: true });
  const warehouses = await Warehouse.find({});
  for (let i = 0; i < warehouses.length; i++) {
    const products = warehouses[i];
    for (let j = 0; j < products.length; j++) {
      if (product.quantity < 100) {
        // nodemailer config
      }
    }
  }
};

module.exports = mailToAdmin;
