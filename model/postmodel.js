const mongoose= require('mongoose')

const postschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        default:"user"

    }
});
module.exports = mongoose.model("post",postschema)