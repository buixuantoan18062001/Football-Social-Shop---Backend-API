const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {

  const { product, quantity } = req.body;

  let cart = await Cart.findOne({
    user: req.user.id
  });

  if (!cart) {
    cart = await Cart.create({
      user: req.user.id,
      items: []
    });
  }

  const index = cart.items.findIndex(
    item => item.product.toString() === product
  );

  if (index > -1) {
    cart.items[index].quantity += quantity;
  } else {
    cart.items.push({
      product,
      quantity
    });
  }

  await cart.save();

  res.json(cart);
};

exports.getCart = async(req,res)=>{

 const cart = await Cart
 .findOne({user:req.user.id})
 .populate("items.product");

 res.json(cart);
};

exports.deleteCart = async (req, res) => {

 const cart = await Cart.findById(req.params.id);

 if (!cart) {
  return res.status(404).json({ message: "Cart item not found" });
 }

 await cart.deleteOne();

 res.json({ message: "Item removed from cart" });

};