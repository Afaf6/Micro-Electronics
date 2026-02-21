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
        return res.status(400).json({msg: "Product not defined"});


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
    createProduct,
    getAllProducts,
    searchProducts
};

