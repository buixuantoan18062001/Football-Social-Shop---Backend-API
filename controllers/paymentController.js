const Payment = require("../models/Payment");
const Order = require("../models/Order");

/* ======================
CREATE PAYMENT
====================== */

exports.createPayment = async (req,res)=>{
 try{

  const {orderId} = req.body;

  const order = await Order.findById(orderId);

  if(!order){
   return res.status(404).json({
    message:"Order not found"
   });
  }

  const payment = await Payment.create({
   user:req.user.id,
   order:orderId,
   amount:order.total
  });

  res.status(201).json({
   message:"Payment created",
   payment
  });

 }catch(error){
  res.status(500).json({
   message:error.message
  });
 }
};


/* ======================
CONFIRM PAYMENT
====================== */

exports.confirmPayment = async (req,res)=>{
 try{

  const {paymentId} = req.body;

  const payment = await Payment.findById(paymentId);

  if(!payment){
   return res.status(404).json({
    message:"Payment not found"
   });
  }

  payment.status = "completed";

  await payment.save();

  await Order.findByIdAndUpdate(
   payment.order,
   {status:"completed"}
  );

  res.json({
   message:"Payment successful",
   payment
  });

 }catch(error){
  res.status(500).json({
   message:error.message
  });
 }
};


/* ======================
GET MY PAYMENTS
====================== */

exports.getMyPayments = async (req,res)=>{
 try{

  const payments = await Payment.find({
   user:req.user.id
  }).populate("order");

  res.json(payments);

 }catch(error){
  res.status(500).json({
   message:error.message
  });
 }
};