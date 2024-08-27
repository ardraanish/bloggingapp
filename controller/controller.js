const Post = require('../model/postmodel')
exports.register = (req,res)=>{
    res.render("register")

}
exports.index = (req,res)=>{
    res.render("index")
}
exports.blog = async (req,res)=>{
    try {
        const post = await Post.find()
        console.log(post);
        
        res.render("blog",{post})
    } catch (error) {
        res.status(400).send(error.msg)
    }
}

exports.content = (req,res)=>{
    res.render("content")
}

exports.admin = (req,res)=>{
    console.log("asfdgfhgdss");
    
    res.render("admin")
}
