const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
 createArticleComment,
 getArticleComments,
 replyArticleComment,
 likeArticleComment,
 deleteArticleComment,
 getArticleCommentReplies
} = require("../controllers/commentArticleController");

router.post("/:articleId",auth,createArticleComment);
router.get("/:articleId",getArticleComments);

router.post("/reply/:id",auth,replyArticleComment);
router.get("/reply/:id", getArticleCommentReplies);

router.post("/like/:id",auth,likeArticleComment);

router.delete("/:id",auth,deleteArticleComment);

module.exports = router;