const express = require("express");
const router = express.Router();

const {product, getAllProducts, searchProducts, filterProduct} = require ("../controllers/productControllers");

router.post("/product", product);
router.get("/products", getAllProducts);
router.get("/search", searchProducts);
router.post("/filterProduct", filterProduct);

<<<<<<< HEAD
router.post("/product", updateProduct);
router.get("/product", getProductDetails);
=======

>>>>>>> 9e5eee3966da54df35207c95ffd5968d05d020b0
module.exports = router;