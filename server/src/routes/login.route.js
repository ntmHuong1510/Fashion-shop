const express = require("express");
const router = express.Router();
const login = require("../controllers/login.controller");

router.post("/", login.authUser);
router.post("/verify-forgot", login.verifyUser);
router.post("/change-password", login.changePassword);

module.exports = router;
