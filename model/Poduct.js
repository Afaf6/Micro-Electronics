const mongoose = require("mongoose");
const { schema } = require("./User");

const producrSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qintity: {
        type: Number,
        required: true 
    }

},{timestamps: true});
