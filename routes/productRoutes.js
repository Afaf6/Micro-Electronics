const express = require("express");

const router = express.Router();

const {product, filterProduct} = require ("../controllers/productControllers");

router.post("/product", product);
router.post("/filterProduct", filterProduct);

router.post("/product", updateProduct);
router.get("/product", getProductDetails);
module.exports = router;