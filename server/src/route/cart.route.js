const express = require("express");
const router = express.Router();
const cart = require("../controllers/cart.controller");

router.get("/", cart.getCartInfo);

router.post("/add", cart.addToCart);
router.post("/update", cart.updateQuantity);
router.post("/delete", cart.deleteItemCart);

module.exports = router;
