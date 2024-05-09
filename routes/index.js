const userRoute = require("./user.route");
const adminRoute = require("./admin.route");
const productRoute = require("./products.route");
const { jwtAuth } = require("../helpers/jwtAuth");

function routes(app) {
  app.use("/api/v1", userRoute);
  app.use("/api/v1/admin", adminRoute);
  app.use("/api/v1/products", jwtAuth, productRoute);
}

module.exports = routes;
