const mongoose = require("mongoose");

const commentArticleSchema = new mongoose.Schema(
{
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  content: {
    type: String,
    required: true
  },

  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CommentArticle",
    default: null
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  isDeleted: {
    type: Boolean,
    default: false
  }

},
{ timestamps: true }
);

module.exports = mongoose.model("CommentArticle", commentArticleSchema);