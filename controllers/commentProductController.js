const CommentProduct = require("../models/CommentProduct");

/* Create comment */
exports.createProductComment = async (req,res)=>{

 const comment = await CommentProduct.create({
  product:req.params.productId,
  user:req.user.id,
  content:req.body.content
 });

 res.status(201).json(comment);

};


/* Get comments */
exports.getProductComments = async (req, res) => {

 const page = parseInt(req.query.page) || 1;
 const limit = parseInt(req.query.limit) || 10;
 const skip = (page - 1) * limit;

 const comments = await CommentProduct
  .find({ product: req.params.productId, parent: null })
  .populate("user","email")
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 });

 const total = await CommentProduct.countDocuments({
  product: req.params.productId,
  parent: null
 });

 res.json({
   total,
   page,
   limit,
   comments
 });
};


/* Reply comment */
exports.replyProductComment = async (req,res)=>{

 const parent = await CommentProduct.findById(req.params.id);

 const reply = await CommentProduct.create({
  product:parent.product,
  user:req.user.id,
  content:req.body.content,
  parent:parent._id
 });

 res.json(reply);

};


/* Get replies of comment */
exports.getCommentReplies = async (req, res) => {

 const page = parseInt(req.query.page) || 1;
 const limit = parseInt(req.query.limit) || 10;
 const skip = (page - 1) * limit;

 const replies = await CommentProduct
  .find({ parent: req.params.id })
  .populate("user", "email")
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: 1 });

 const total = await CommentProduct.countDocuments({
  parent: req.params.id
 });

 res.json({
  total,
  page,
  limit,
  replies
 });

};


/* Like comment */
exports.likeProductComment = async (req,res)=>{

 const comment = await CommentProduct.findById(req.params.id);

 const index = comment.likes.indexOf(req.user.id);

 if(index === -1){
  comment.likes.push(req.user.id);
 }else{
  comment.likes.splice(index,1);
 }

 await comment.save();

 res.json(comment);

};


/* Delete comment */
exports.deleteProductComment = async (req,res)=>{

 const comment = await CommentProduct.findById(req.params.id);

 if(!comment){
  return res.status(404).json({message:"Comment not found"});
 }

 comment.isDeleted = true;
 comment.content = "This comment was deleted";

 await comment.save();

 res.json({message:"Comment deleted"});

};