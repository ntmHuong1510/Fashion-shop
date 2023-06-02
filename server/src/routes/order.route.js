const express = require("express");
const router = express.Router();
const order = require("../controllers/order.controller");

router.get("/orders", order.getOrders);
router.get("/order", order.getOrderById);
router.get("/allOrder", order.getAllOrders);

router.post("/create", order.createOrder);
router.post("/delete", order.deleteOrder);
router.post("/updateStatus", order.updateStatusOrder);

module.exports = router;
