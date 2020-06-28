const mongoose = require('mongoose');
const uniqueValidtor=require("mongoose-unique-validator");
const Schema = mongoose.Schema;



const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    posts:[{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Post"
    }],
    comments:[{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Comment"
    }],
    followings:[{
        type:String,
        required:true,
    }],
    followers:[{
        type:String,
        required:true,
    }],
    created:{
        type: Date,
        default: Date.now
        },
    updated: Date,
});

userSchema.plugin(uniqueValidtor);

module.exports=mongoose.model("User",userSchema);