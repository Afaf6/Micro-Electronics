require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

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


//Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/api", productRoutes);



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Is Running ${port}`);
})
