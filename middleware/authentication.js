const jwt=require("jsonwebtoken")
const User = require("../model/usermodels")
exports.authentecate=async(req,res,next)=>{
    const token=req.headers.cookie.split("=")[1]
    console.log(token)

    if(!token)return res.redirect("/login")
        try {
            const decoded= jwt.verify(token,process.env.SECRET_KEY)
            const id=decoded.user_id
            console.log("hjgh",id)
            const user=await User.findById(id)
            req.user=user
            next()
        } catch (error) {
            res.status(400).send(error.msg)
        }
}
