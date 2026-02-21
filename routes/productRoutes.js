const express = require("express");

const router = express.Router();

const product = require ("../controllers/productControllers");

router.post("/product", product);

module.exports = router;