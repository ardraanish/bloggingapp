const Post = require('../model/postmodel')


exports.createpost = async(req,res)=>{
   
    try {
        const {title,content}=req.body
        console.log(title,content)
        const author = req.user._id
        const post = new Post({title,content,author:author})
        await post.save()
        res.redirect("/profile")
    } catch (error) {
        res.status(400).send(error.msg)
    }
    
}
exports.getAllPost=async(req,res)=>{
  
    try {
        console.log(req.user)
        console.log(req.user._id)
        const userId = req.user._id
        const post = await Post.find({author:userId})
        // console.log(post);
        
        res.render("profile",{post})
    } catch (error) {
        res.status(400).send(error.msg)
    }
}

exports.updatepost = async(req,res)=>{
    console.log("jgcfxdgxfhv");
    
    try {
        const {title,content}=req.body
        const postid=req.params.id
        console.log(title,content)
        const post = await Post.findByIdAndUpdate({_id:postid},{title:title,content:content})
        // res.render("editform",{post})
        res.send("OK")
        console.log("asdfghjk",req.params.id)
    } catch (error) {
        res.status(400).send(error.msg)
    }
}
exports.editform =async(req,res)=>{
    const post_id=req.params.id
    const post=await Post.findById({_id: post_id})
    res.render("editform",{post})
    console.log("adfghjkfghjk")
}

exports.deletepost = async(req,res)=>{
    try {
        console.log("kjnbjgyih")
        await Post.findByIdAndDelete(req.params.id)
        res.send("OK")
    } catch (error) {
        res.status(400).send(error.msg)
    }
}