const mongoose = require("mongoose");
const { schema } = require("./User");

const producrSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true 
    }

},{timestamps: true});

const Product = mongoose.model("Product" , producrSchema);
module.exports = Product;
