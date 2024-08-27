const jwt=require("jsonwebtoken")
const User = require("../model/usermodels")
exports.autheraization=async(req,res,next)=>{
    // const token=req.cookies?.token
    const token=req.headers.cookie.split("=")[1]
    console.log(token)

    if(!token)return res.redirect("/login")
        try {
            const decoded= jwt.verify(token,process.env.SECRET_KEY)
            const id=decoded.user_id
            console.log("hjgh",id)
            const user=await User.findById(id)
            if(user.role == 'admin'){
                req.user=user
                next();
            }else{
                res.redirect("/login")
            }
            
        } catch (error) {
            res.status(400).send(error.msg)
        }
}