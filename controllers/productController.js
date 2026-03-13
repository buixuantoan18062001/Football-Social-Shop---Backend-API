const Product = require("../models/Product");
const productService = require("../services/productService");


/* GET PRODUCTS */
exports.getProducts = async (req, res, next) => {
  try {

    const result = await productService.getProducts(req.query);

    res.json({
      success: true,
      page: result.page,
      totalPages: Math.ceil(result.total / result.limit),
      total: result.total,
      data: result.products
    });

  } catch (error) {
    next(error);
  }
};


/* GET PRODUCT BY ID */
exports.getProductById = async (req, res, next) => {
  try {

    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    next(error);
  }
};


/* CREATE PRODUCT */
exports.createProduct = async (req, res, next) => {
  try {

    const product = await productService.createProduct(req.body);

    res.status(201).json(product);

  } catch (error) {
    next(error);
  }
};


/* UPDATE PRODUCT */
exports.updateProduct = async (req, res, next) => {
  try {

    const product = await productService.updateProduct(
      req.params.id,
      req.body
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);

  } catch (error) {
    next(error);
  }
};


/* DELETE PRODUCT */
exports.deleteProduct = async (req, res, next) => {
  try {

    const product = await productService.deleteProduct(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted"
    });

  } catch (error) {
    next(error);
  }
};

// Product Rating
exports.rateProduct = async (req, res) => {
 try {

  const { rating } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
   return res.status(404).json({
    message: "Product not found"
   });
  }

  // FIX: đảm bảo ratings tồn tại
  if (!product.ratings) {
   product.ratings = [];
  }

  const existingRating = product.ratings.find(
   r => r.user.toString() === req.user.id
  );

  if (existingRating) {
   existingRating.rating = rating;
  } else {
   product.ratings.push({
    user: req.user.id,
    rating
   });
  }

  await product.save();

  res.json(product);

 } catch (error) {

  res.status(500).json({
   message: error.message
  });

 }
};

//LIKE product
exports.likeProduct = async (req,res)=>{

 try{

  const product = await Product.findByIdAndUpdate(

   req.params.id,

   { $inc:{ likes:1 } },

   { new:true }

  );

  res.json(product);

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }
};

// Trending Products

exports.getTrendingProducts = async (req,res)=>{

 try{

  const products = await Product
   .find()
   .sort({ likes:-1, views:-1 })
   .limit(10);

  res.json(products);

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

