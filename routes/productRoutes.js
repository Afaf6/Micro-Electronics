const express = require("express");
const router = express.Router();

const {createProduct, getAllProducts, searchProducts} = require("../controllers/productControllers");


router.post("/product", createProduct);
router.get("/products", getAllProducts);
router.get("/search", searchProducts);

module.exports = router;