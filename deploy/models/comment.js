const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentSchema=new Schema({
    body:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    },
    post:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Post"
    },
    created:{
        type: Date,
        default: Date.now
        },
    updated: Date,
});

module.exports=mongoose.model("Comment",CommentSchema);