const Product = require("../model/Product");

const product = async(req,res) => {
    try{ 
        const {product_name , price, quantity} = req.body;
        
      if (!product_name || !price || !quantity) return res.status(400).json({msg: "Product not dofined"});

      const existProduct = await Product.findOne({ product_name });

        if (existProduct) {
      return res.status(400).json({
        msg: "Product already exists"
      });
    } 
       const product = await Product.create({
        product_name,
        price,
        quantity
       });
       res.status(201).json({
           success: true,
           data: product
        });

    } catch (error){
        console.log(error);
        
    }
};
module.exports = product;