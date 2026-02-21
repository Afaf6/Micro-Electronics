const Product = require("../model/Product");

const createProduct = async(req, res) => {
    try { 
        const { product_name , price, quantity } = req.body;
        
        if (!product_name || !price || !quantity) {
            return res.status(400).json({ msg: "Product fields are missing" });
        }

        const existProduct = await Product.findOne({ product_name });
        if (existProduct) {
            return res.status(400).json({ msg: "Product already exists" });
        } 

        const newProduct = await Product.create({
            product_name,
            price,
            quantity
        });

        res.status(201).json({
            success: true,
            data: newProduct 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.log(error);
    }
};

const searchProducts = async (req, res) => {
    try {
        const { search, minPrice, maxPrice } = req.query;
        let query = {};

        if (search) {
            query.product_name = { $regex: search, $options: "i" };
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        const products = await Product.find(query);
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    createProduct,
    getAllProducts,
    searchProducts
};

