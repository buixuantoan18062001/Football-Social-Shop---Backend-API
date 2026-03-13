const Product = require("../models/Product");
const Order = require("../models/Order");

exports.createOrder = async (req,res)=>{
 try{

  const {items,address} = req.body;

  if(!items || items.length === 0){
   return res.status(400).json({message:"Order items required"});
  }

  let total = 0;

  for(const item of items){

   const product = await Product.findById(item.product);

   if(!product){
    return res.status(404).json({message:"Product not found"});
   }

   if(product.stock < item.quantity){
    return res.status(400).json({
     message:`Not enough stock for ${product.name}`
    });
   }

   total += product.price * item.quantity;

   product.stock -= item.quantity;

   await product.save();

  }

  const order = await Order.create({
   user:req.user.id,
   items,
   total,
   address
  });

  res.status(201).json(order);

 }catch(error){
  res.status(500).json({message:error.message});
 }
};


/* =========================
   USER: GET MY ORDERS
========================= */

exports.getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user.id
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


/* =========================
   ADMIN: GET ALL ORDERS
========================= */

exports.getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


/* =========================
   UPDATE ORDER (ADMIN)
========================= */

exports.updateOrder = async (req, res) => {
  try {

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate("user", "name email")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


/* =========================
   DELETE ORDER (ADMIN)
========================= */

exports.deleteOrder = async (req, res) => {
  try {

    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      message: "Order deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};