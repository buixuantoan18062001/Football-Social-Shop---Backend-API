const CommentArticle = require("../models/CommentArticle");

/* Create comment */
exports.createArticleComment = async (req,res)=>{

 const comment = await CommentArticle.create({
  article:req.params.articleId,
  user:req.user.id,
  content:req.body.content
 });

 res.status(201).json(comment);

};


/* Get comments */
exports.getArticleComments = async (req,res)=>{

 const comments = await CommentArticle
 .find({
  article:req.params.articleId,
  parent:null,
  isDeleted:false
 })
 .populate("user","email")
 .sort({createdAt:-1});

 res.json(comments);

};


exports.getArticleComments = async (req, res) => {

 const page = parseInt(req.query.page) || 1;
 const limit = parseInt(req.query.limit) || 10;
 const skip = (page - 1) * limit;

 const comments = await CommentArticle
  .find({ article: req.params.articleId, parent: null })
  .populate("user","email")
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 });

 const total = await CommentArticle.countDocuments({
  article: req.params.articleId,
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
exports.replyArticleComment = async (req,res)=>{

 const parent = await CommentArticle.findById(req.params.id);

 const reply = await CommentArticle.create({
  article:parent.article,
  user:req.user.id,
  content:req.body.content,
  parent:parent._id
 });

 res.json(reply);

};

/* Get replies of comment */
exports.getArticleCommentReplies = async (req,res)=>{

 const page = parseInt(req.query.page) || 1;
 const limit = parseInt(req.query.limit) || 10;
 const skip = (page - 1) * limit;

 const replies = await CommentArticle
 .find({
  parent:req.params.id,
  isDeleted:false
 })
 .populate("user","email")
 .skip(skip)
 .limit(limit)
 .sort({createdAt:1});

 const total = await CommentArticle.countDocuments({
  parent:req.params.id,
  isDeleted:false
 });

 res.json({
  total,
  page,
  limit,
  replies
 });

};


/* Like comment */
exports.likeArticleComment = async (req,res)=>{

 const comment = await CommentArticle.findById(req.params.id);

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
exports.deleteArticleComment = async (req,res)=>{

 const comment = await CommentArticle.findById(req.params.id);

 if(!comment){
  return res.status(404).json({message:"Comment not found"});
 }

 comment.isDeleted = true;
 comment.content = "This comment was deleted";

 await comment.save();

 res.json({message:"Comment deleted"});

};