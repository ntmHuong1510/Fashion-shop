const express = require("express");
const router = express.Router();
const product = require("../controllers/product.controller");

router.get("/", product.getProductList);
router.get("/product", product.getProduct);
router.get("/search", product.searchProduct);

module.exports = router;
