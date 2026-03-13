const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/
exports.register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Wrong password"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

/*
|--------------------------------------------------------------------------
| Get Profile
|--------------------------------------------------------------------------
*/
exports.profile = async (req, res) => {

  try {

    const user = await User
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      data: user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

};

/* UPDATE MY PROFILE */

exports.updateMyProfile = async (req, res) => {

 try {

  const user = await User.findByIdAndUpdate(
   req.user.id,
   req.body,
   { new: true }
  ).select("-password");

  if (!user) {
   return res.status(404).json({
    message: "User not found"
   });
  }

  res.json({
   message: "Profile updated",
   user
  });

 } catch (error) {

  res.status(500).json({
   message: error.message
  });

 }

};

/* DELETE MY ACCOUNT */

exports.deleteMyAccount = async (req, res) => {

 try {

  const user = await User.findByIdAndDelete(req.user.id);

  if (!user) {
   return res.status(404).json({
    message: "User not found"
   });
  }

  res.json({
   message: "Account deleted successfully"
  });

 } catch (error) {

  res.status(500).json({
   message: error.message
  });

 }

};


//Change Password


exports.changePassword = async (req,res)=>{

 try{

  const {currentPassword,newPassword} = req.body;

  const user = await User.findById(req.user.id);

  const isMatch = await bcrypt.compare(
   currentPassword,
   user.password
  );

  if(!isMatch){
   return res.status(400).json({
    message:"Current password incorrect"
   });
  }

  user.password = await bcrypt.hash(newPassword,10);

  await user.save();

  res.json({
   message:"Password changed successfully"
  });

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

// 