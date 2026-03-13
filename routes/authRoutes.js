const express = require("express");

const { register, login, profile, deleteMyAccount, updateMyProfile, changePassword } = require("../controllers/authController");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", auth, profile);
router.delete("/profile", auth, deleteMyAccount);
router.put("/profile", auth, updateMyProfile);

router.patch("/profile/password", auth, changePassword);

module.exports = router;