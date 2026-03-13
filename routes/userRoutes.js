const express = require("express");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getUsers,
  getUserById,
  updateUser,
  updateUserRole,
  deleteUser,
  getStats,
} = require("../controllers/userController");

const router = express.Router();

/* ADMIN STATS */
router.get("/stats", auth, role("admin"), getStats);

router.get("/", auth, role("admin"), getUsers);
router.get("/:id", auth, role("admin"), getUserById);
router.put("/:id", auth, role("admin"), updateUser);
router.patch("/:id/role", auth, role("admin"), updateUserRole);
router.delete("/:id", auth, role("admin"), deleteUser);

/* ADMIN STATS */

router.get("/stats", auth, role("admin"), getStats);


module.exports = router;