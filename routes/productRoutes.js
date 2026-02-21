const express = require("express");
const router = express.Router();

const productController = require("../controllers/productControllers");


router.post("/product", productController.createProduct);
router.get("/products", productController.getAllProducts);
router.get("/search", productController.searchProducts);

module.exports = router;