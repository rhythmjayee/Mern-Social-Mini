const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema=new Schema({
    body:{
        type:String,
        required:true
    },
    likes:[{
        type:String,
        required:true,
    }],
    comments:[{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Comment"
    }],
    creator:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    },
    created:{
        type: Date,
        default: Date.now
        },
    updated: Date,
});

module.exports=mongoose.model("Post",PostSchema);