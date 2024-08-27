const User=require('../model/usermodels')
const bcrypt= require("bcryptjs")
const jwt=require('jsonwebtoken')


exports.signUp = async(req,res)=>{
   
    try{
        const {username,password} = req.body;
        const hashedpass=await bcrypt.hash(password,10)
        // console.log(username,password)
        const user = new User({username,password:hashedpass})
        // console.log(hashedpass);
        
        await user.save()
        res.redirect("/login")

    }catch(err){
        res.status(400).send(err.message)
    }
}

exports.signIn = async(req,res)=>{
  
    try{ 
        console.log("jbhgfc");
        
        const{username,password} = req.body;
        const user= await User.findOne({username:username})
        if(user && await bcrypt.compare(password,user.password)){
            const token=jwt.sign({user_id:user._id},process.env.SECRET_KEY)
            res.cookie("token",token,{httpOnly:true})
            res.redirect("/profile")
        }else{
            res.status(400).send(err.message)
        }
        // console.log(user)
       

        
        
}catch(err){
    res.status(400).send(err.message)
}
}

exports.logout = async (req,res)=>{
    res.clearCookie('token',{httpOnly:true})
    res.redirect("/login")
}


