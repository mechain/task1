const {
  login,
  signUp,
  getUserList,
  userApproval,
  accountStatus,
  searchUser,
} = require("../controller/admin");
const { jwtAuth, adminAuth } = require("../helpers/jwtAuth");

const route = require("express").Router();

route.post("/login", login);
route.post("/signup", signUp);
route.get("/get_user_lists", jwtAuth, adminAuth, getUserList);
route.post("/approve_user", jwtAuth, adminAuth, userApproval);
route.post("/account_status", jwtAuth, adminAuth, accountStatus);
route.post("serch_user", jwtAuth, adminAuth, searchUser);

module.exports = route;
