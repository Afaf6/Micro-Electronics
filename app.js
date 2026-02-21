require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());


async function dbConnection() {
    try{
        const dbUrl = process.env.DB_URL;
        if (!dbUrl) {
            console.error("Missing DB_URL in environment. Create a .env file with DB_URL=");
            process.exit(1);
        }
        await mongoose.connect(dbUrl);
        console.log("DB connected");
    } catch(error){
        console.error("DB connection error:", error);
        process.exit(1);
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