const User = require("../models/User");
const {buildQuery} = require("../services/queryService");

/* GET ALL USERS */

exports.getUsers = async(req,res)=>{

 try{

  const query = buildQuery(
   User.find().select("-password"),
   req.query
  );

  const users = await query;

  res.json(users);

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};


/* GET USER BY ID */
exports.getUserById = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

/* UPDATE USER */
exports.updateUser = async (req, res) => {

 try{

  const user = await User.findByIdAndUpdate(
   req.params.id,
   req.body,
   { new:true }
  ).select("-password");

  if(!user){
   return res.status(404).json({
    message:"User not found"
   });
  }

  res.json({
   message:"User updated",
   user
  });

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

/* DELETE USER */
exports.deleteUser = async (req, res) => {
  try {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

/* UPDATE USER ROLE */

exports.updateUserRole = async(req,res)=>{

 try{

  const user = await User.findByIdAndUpdate(

   req.params.id,

   { role:req.body.role },

   { new:true }

  ).select("-password");

  if(!user){

   return res.status(404).json({
    message:"User not found"
   });

  }

  res.json({
   message:"User role updated",
   user
  });

 }catch(error){

  res.status(500).json({
   message:error.message
  });

 }

};

/* ADMIN DASHBOARD STATS */

exports.getStats = async(req,res)=>{

 const users = await User.countDocuments();

 res.json({
  users
 });

};