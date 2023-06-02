const express = require("express");
const router = express.Router();
const payment = require("../controllers/payment.controller");

router.post("/create-momo-payment", payment.createPayment);

router.post("/ipn-momo", payment.ipnMomo);

module.exports = router;
