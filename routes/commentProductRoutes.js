const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
 createProductComment,
 getProductComments,
 replyProductComment,
 likeProductComment,
 deleteProductComment,
 getCommentReplies,
} = require("../controllers/commentProductController");

router.post("/:productId",auth,createProductComment);
router.get("/:productId",getProductComments);

router.post("/reply/:id",auth,replyProductComment);
router.get("/reply/:id", getCommentReplies);

router.post("/like/:id",auth,likeProductComment);

router.delete("/:id",auth,deleteProductComment);

module.exports = router;