const express = require("express");

const router = express.Router();

const product = require ("../controllers/productControllers");

router.post("/product", product);

router.post("/product", updateProduct);
router.get("/product", getProductDetails);
module.exports = router;