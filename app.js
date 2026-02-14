require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

const User = require("./model/User");

app.post("/register", async(req, res) => {
    try{
        
        
        const {username, email, password, role} = req.body;

        if (!username || !email || !password) return res.status(400).json({msg: "Missing Data"});
        const existuser = await User.findOne({email});

        if (existuser) return res.status(400).json({msg: "Accont Already exist"});
        const hashingPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password : hashingPassword,
            role
        });
        res.status(201).json({
            msg: "Done Create User",
            data: user,
        });
    } catch (error){
        console.log(error);
        
    }
});

app.post("/login", async(req,res) => {
    
    try {
        const {email , password} = req.body;
      if (!email || !password) return res.status(400).json({msg: "Email, Password requir"});

      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({msg: "Accont not found Please create accont"})
      }
    const matchPassword = await bcrypt.compare(password, user.password);
    
    if (!matchPassword) return res.status(400).json({msg: "Invalide Password"})

        const authCode = Buffer.from(user._id.toString()).toString("base64")
       
        res.status(200).json({
            msg: "Success login",
            data: authCode
        });


    } catch (error){
        console.log(error);
        
    }
})

app.post("/product", async(req,res) => {
    try{ const {product_name , price, qintity} = req.body;
      if (!product_name || !price || !qintity) return res.status(400).json({msg: "Product not dofined"});

      const user = await User.findOne({email});

    } catch (error){
        console.log(error);
        
    }
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server Is Running ${port}`);
})