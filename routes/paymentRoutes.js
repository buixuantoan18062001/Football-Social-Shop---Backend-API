const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
 createPayment,
 confirmPayment,
 getMyPayments
} = require("../controllers/paymentController");

router.post("/create",auth,createPayment);

router.post("/confirm",auth,confirmPayment);

router.get("/my",auth,getMyPayments);

module.exports = router;