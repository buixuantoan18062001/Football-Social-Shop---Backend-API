const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");

const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

/* ======================
   Upload Profile Image
====================== */

router.post(
  "/profile-image",
  auth,
  upload.single("file"),
  async (req, res) => {

    try {

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        });
      }

      const imageUrl = req.file.path;

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { profileImage: imageUrl },
        { new: true }
      );

      res.json({
        success: true,
        message: "Profile image uploaded",
        image: imageUrl,
        user
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);


/* ======================
   Update Profile Image
====================== */

router.put(
  "/profile-image",
  auth,
  upload.single("file"),
  async (req, res) => {

    try {

      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      /* delete old image */

      if (user.profileImage) {

        const publicId = user.profileImage
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(publicId);

      }

      const imageUrl = req.file.path;

      user.profileImage = imageUrl;

      await user.save();

      res.json({

        success: true,
        message: "Profile image updated",
        image: imageUrl

      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);


/* ======================
   Delete Profile Image
====================== */

router.delete("/profile-image", auth, async (req, res) => {

  try {

    const user = await User.findById(req.user.id);

    if (!user.profileImage) {
      return res.json({
        message: "No profile image"
      });
    }

    const publicId = user.profileImage
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0];

    await cloudinary.uploader.destroy(publicId);

    user.profileImage = "";

    await user.save();

    res.json({

      success: true,
      message: "Profile image deleted"

    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

module.exports = router;