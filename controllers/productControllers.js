const Product = require("../model/Product");

const product = async(req,res) => {
    try{ 
        const {product_name , price, quantity} = req.body;

        if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ 
        msg: "Access denied: only admins can add products"
      });
    }
        
      if (!product_name || !price || !quantity) 
        return res.status(400).json({msg: "Product not dofined"});

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

const filterProduct = async(req, res) => {
try{
    let filter = {};

    if (req.query.name) {
        filter.product_name = {
            $regex: req.query.name,
            $options: "i"
        };
    }

    if (req.query.minPrice || req.query.maxPrice){
        filter.price = {};
    
    if (req.query.minPrice) {
        filter.price.$gte = Number(req.query.minPrice);
    }
     if (req.query.maxPrice) {
        filter.price.$lte = Number(req.query.maxPrice);
    }};

    if (req.query.role !== "admin"){
        filter.quantity = {$gt: 0};
    }
    
    const product = await Product.find(filter);

       res.status(201).json({
           success: true,
           results: product.length,
           data: product
        });

} catch(error) {
    console.log(error);
}
};

module.exports = {
    product,
    filterProduct,
};