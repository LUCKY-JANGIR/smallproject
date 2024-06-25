const express = require('express');
const User = require("../models/usermodel")
const bcrypt = require ("bcrypt")

const register = async(req,res)=>{
    try {
        const{name,username,email,phone,password}=req.body;
        const checkUsername =  await User.findOne({username}).select("-password")
        if(checkUsername){
            return res.json({status:false,msg:"Username already exist please choose a unique and  diffrent name",errstatus:false})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = new User({name,username,email,phone,password:hashedPassword});
        await newuser.save();
        return res.json({status:true,user_id:newuser._id})
    } catch (error) { 
        res.json({status:false,msg:"an error uccured",errstatus:true,err:error})
    }
} 
const login = async(req,res)=>{
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
          return res.json({ status: false, msg: "Check your username or password", errstatus: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.json({ status: false, msg: "Check your username or password", errstatus: false });
        }
        return res.json({ status: true, user_id: user._id });
      } catch (error) {
        res.json({ status: false, msg: "An error occurred", errstatus: true, err: error });
        console.log(error);
      }
}
const profile = async (req, res) => {
    try {
        const{userid}=req.body;
        const checkUsername =  await User.findById(userid).select('-password')
        return res.json({status:true,details:checkUsername})
    } catch (error) { 
        console.log(error)
        res.json({status:false,msg:"an error uccured",errstatus:true,err:error})
    }
  }
    


module.exports={
    register,
    login,
    profile
}