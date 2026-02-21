require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());


async function dbConnection() {
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("DB connected");
    } catch(error){
        console.log(error);
    }
}
dbConnection();

// const User = require("./model/User");
// const Product = require("./model/Product");

//Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/api", productRoutes);

app.get("/api", productRoutes);

app.get("/api/products/search", )

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Is Running ${port}`);
})
