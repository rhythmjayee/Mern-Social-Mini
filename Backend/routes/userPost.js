const express=require("express")
const router =express.Router();
const mongoose=require("mongoose");

const {check,validationResult} =require("express-validator");


const HttpError=require("../models/HttpError");
const User=require("../models/user"); 
const Post=require("../models/post");
const checkAuth =require("../config/authCheck");

router.get("/:uid",async(req,res,next)=>{
    const userId=req.params.uid;

    let posts;
    try{
         posts=await Post.find({creator:userId},null,{sort: {created: -1}}).populate("creator",{name:1}).populate({path:"comments",populate:{path:"user"}});
    }
    catch(err){
        console.log(err);
        const error=new HttpError("Couldnt able to load PostList",500);
       return next(error);
    }

    // if(!todos || todos.length===0){
    //     const error=new new HttpError("Couldnt find the todos",404);
    //    return next(error);
    // }
    // res.json(posts);

    res.json(posts);

    

});

router.post("/add",
[
    check("body").isLength({min:6})
],

checkAuth,async(req,res,next)=>{

    const error=validationResult(req);
        console.log(error.errors);
        if(error.errors.length!==0){
            return next(new HttpError("Post body is Too short!!!",422));
        }
   const {body,creator}=req.body;

    const newPost=new Post({
        body,
        creator
    });

    
    let user;

    try{
        user=await User.findById(creator);
    }catch(err){
        return next(new HttpError("adding post failed",500));
    }

    if(!user){
        return next(new HttpError("Couldnt find user",404));
    }

    if(newPost.creator.toString() !==req.user.id){
        return next(new HttpError("Your are not allowed to add ",401));

    }

    newPost.user=user;


    // let response;
    try{
        //  response=await newTodo.save();
        const sess=await mongoose.startSession();
        sess.startTransaction();
        await newPost.save({session:sess});
        user.posts.push(newPost);
        await user.save({session:sess});
        await sess.commitTransaction();
    }
    catch(err){
        console.log(err);
        const error=new HttpError("Couldnt able to store new Post",500);
       return next(error);
    }
    // console.log(response); 
    let posts=await Post.find({creator:creator});
    res.json(posts);


});

router.delete("/:id",checkAuth,async(req,res,next)=>{
    const id=req.params.id;

    let post;
    try{
        post=await Post.findById(id).populate("creator");
    }
    catch(err){
        console.log(err);
        const error=new HttpError("Something went wrong",500);
        return next(error);
    }

    if(!post){
        const error=new HttpError("post doesnt exist",404);
        return next(error);
    }

//    console.log(todo.creator._id.toString());
//    console.log(req.userData.userId);

    if(post.creator._id.toString() !==req.user.id){
        return next(new HttpError("Your are not allowed to delete ",403));

    }


    try{
        const sess=await mongoose.startSession();
        sess.startTransaction();
       await post.remove({session:sess});
        post.creator.posts.pull(post);
        await post.creator.save({session:sess});
        await sess.commitTransaction();


    }catch(err){
        console.log(err);
        const error=new HttpError("Something went wrong",500);
        return next(error);
    }



    res.json('post deleted successfully')

});


module.exports=router;