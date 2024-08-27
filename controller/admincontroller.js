const User=require('../model/usermodels')
const Post = require("../model/postmodel")
const bcrypt= require("bcryptjs")
const jwt=require('jsonwebtoken')

//admin login

exports.adminIn = async(req,res)=>{
    try {
        console.log("adwaith anish");

        const{username,password}=req.body;
        const user=await User.findOne({username:username})
        if(user && user.role==="admin" && await bcrypt.compare(password,user.password)){
            const token=jwt.sign({user_id:user._id},process.env.SECRET_KEY)
            res.cookie("token",token).redirect("/admin/user")
        }else{
            res.send("invalid")
        }
    } catch (error) {
        res.status(400).send(error.msg)
        
    }
}

//get all user
exports.getEveryUser = async(req,res)=>{
    console.log("adsgsddghsbhjsbc b bc vsgbsdngvskdj")
    try {
        const user = await User.find({role:"user"})
        console.log(user)
        
        res.render("adminProfile",{user})
    } catch (error) {
        res.status(400).send(error.msg)
    }
}

exports.editUser = async(req,res)=>{
    try {
        console.log("edit userererer")
        const user = await User.findByIdAndUpdate(req.params.id,{username:req.body.username,role:req.body.role})
        console.log(user)
        
        res.redirect("/admin/user")
    } catch (error) {
        res.status(400).send(error.msg)
    }
}
exports.getUserById = async(req,res)=>{
    try {
        const user = await User.findOne({_id:req.params.id})
        console.log(user)
        
        res.render("userEdit",{user})
    } catch (error) {
        res.status(400).send(error.msg)
    }
}
exports.deleteUser = async(req,res)=>{
 try{
    await User.findByIdAndDelete(req.params.id)
    res.send("OK")
 }catch(error){

 }
}
exports.adminEditPost = async(req,res)=>{
    try{
    const {title,content} = req.body
    await Post.findByIdAndUpdate(req.params.id,{title:req.body.title,content:req.body.content})
    res.send("OK")
    }catch(err){
      res.status(404).send(err.message)
    }
  }
  exports.adminPostById = async(req,res)=>{
    try{
      const post = await Post.findOne({_id:req.params.id})
      res.render("editPost",{post})
      
    }catch(err){
      res.status(404).send(err.message)
    }
  }
  exports.adminDeletePost = async(req,res)=>{
   
    await Post.findByIdAndDelete(req.params.id)
    // res.redirect("/admin/post");
    res.status(200).json({message: 'deleted'});
  }
  
  exports.specificUserPost= async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        const post = await Post.find({ author: userId });
        if (!post) {
          return res.status(404).send('post not found');
      }
        res.render('adminPost', {user, post }); 
    } catch (err) {
        res.status(500).send('Server error');
    }
  }