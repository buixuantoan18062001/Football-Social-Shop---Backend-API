const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
 createOrder,
 getMyOrders,
 getAllOrders,
 updateOrder,
 deleteOrder
} = require("../controllers/orderController");

router.post("/", auth, createOrder);

router.get("/my-orders", auth, getMyOrders);

router.get("/", auth, role("admin"), getAllOrders);

router.put("/:id", auth, role("admin"), updateOrder);

router.delete("/:id", auth, role("admin"), deleteOrder);

module.exports = router;