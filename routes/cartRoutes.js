const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
 getCart,
 addToCart,
 deleteCart
} = require("../controllers/cartController");

router.get("/", auth, getCart);

router.post("/", auth, addToCart);

router.delete("/:id", auth, deleteCart);

module.exports = router;