const express = require("express");
const router = express.Router();

const {product, getAllProducts, searchProducts, filterProduct} = require ("../controllers/productControllers");

router.post("/product", product);
router.get("/products", getAllProducts);
router.get("/search", searchProducts);
router.post("/filterProduct", filterProduct);


module.exports = router;