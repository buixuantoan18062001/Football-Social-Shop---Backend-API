const router = require("express").Router();

const {
 getProducts,
 getProductById,
 createProduct,
 updateProduct,
 deleteProduct,
 rateProduct,
 getTrendingProducts,
 likeProduct,
} = require("../controllers/productController");

const auth = require("../middleware/authMiddleware");

router.get("/trending", getTrendingProducts);

router.post("/:id/like", auth, likeProduct);

router.post("/:id/rating", auth, rateProduct);


router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", auth, createProduct);

router.put("/:id", auth, updateProduct);

router.delete("/:id", auth, deleteProduct);


module.exports = router;

