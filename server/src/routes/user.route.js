const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");

router.post("/createUser", user.createUser);

router.post("/updateUserInfo", user.updateUserInfo);
router.get("/searchUser", user.searchUser);
router.get("/getUserList", user.viewAllUsers);
router.get("/getUserName", user.getUserName);
router.delete("/deleteUser", user.deleteUser);

module.exports = router;
