const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  likeArticle,
  getTrendingArticles,
} = require("../controllers/articleController");


router.get("/trending", getTrendingArticles);

router.get("/", getArticles);

router.get("/:id", getArticle);

router.post("/", auth, createArticle);

router.put("/:id", auth, updateArticle);

router.delete("/:id", auth, deleteArticle);

router.post("/:id/like", auth, likeArticle);


module.exports = router;