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

const updateProduct = async (req,res) => {
  try {
    const {id} = req.params;
    const {product_name, price, quantity} = req.body;
    const updatedProduct = await product.findByIdAndUpdate(id, {product_name, price, quantity}, {new: true});
    if (!updatedProduct) {
      return res.status(404).json({msg: "Product not found"});
    }
    res.status(200).json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "Server Error"});
  }
};

const getProductDetails = async (req,res) => {
  try {
    const {id} = req.params;
    const product = await product.findById(id);
    if(!product) {
      return res.status(404).json({msg: "Product not found"});
    }
    const isAvailable = product.quantity > 0? "In Stock" : "Out of Stock";
    res.status(200).json({
            success: true,
            data: {
                name: product.product_name,
                price: product.price,
                stock_status: isAvailable,
                remaining_quantity: product.quantity
            }
        });
  }catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
};
module.exports = product;