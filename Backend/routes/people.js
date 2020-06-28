const express=require("express")
const router =express.Router();
const mongoose=require("mongoose");

const HttpError=require("../models/HttpError");
const User=require("../models/user"); 
const Post=require("../models/post");
const Comment=require("../models/comment");

const checkAuth =require("../config/authCheck");


router.get("/",checkAuth,async(req,res,next)=>{
    let people;
    let loginUserId=req.user.id;
    try{
        people=await User.find({_id: { $ne: loginUserId }}).select('-password');
   }
   catch(err){
       console.log(err);
       const error=new HttpError("Couldnt able to load People",500);
      return next(error);
   }

   res.json(people);
});

router.post("/follow",checkAuth,async(req,res,next)=>{

   const {followId,userId}=req.body;

   let user=await User.findById(userId);

    
    let fUser;

    try{
        fUser=await User.findById(followId);
    }catch(err){
        return next(new HttpError("following failed",500));
    }

    if(!fUser){
        return next(new HttpError("Couldnt find user",404));
    }

    if(userId.toString() !==req.user.id){
        return next(new HttpError("Your are not allowed to add ",401));

    }


    // let response;
    try{
        //  response=await newTodo.save();
        const sess=await mongoose.startSession();
        sess.startTransaction();
        fUser.followers.push(userId);
        await fUser.save({session:sess});
        user.followings.push(followId);
        await user.save({session:sess});
        await sess.commitTransaction();
    }
    catch(err){
        console.log(err);
        const error=new HttpError("Couldnt able to store new Following",500);
       return next(error);
    }
    // console.log(response); 
    res.json( 'User followed successfully');


});

router.post("/like",checkAuth,async(req,res,next)=>{

    const {PostId}=req.body;
 
    let user=await User.findById(req.user.id);
 
     
     let post;
 
     try{
        post=await Post.findById(PostId);
     }catch(err){
         return next(new HttpError("liking failed",500));
     }
 
     if(!user){
         return next(new HttpError("Couldnt find user",404));
     }
 
    //  if(userId.toString() !==req.user.id){
    //      return next(new HttpError("Your are not allowed to add ",401));
 
    //  }
 
 
     // let response;
     try{
         //  response=await newTodo.save();
         const sess=await mongoose.startSession();
         sess.startTransaction();
         post.likes.push(req.user.id);
         await post.save({session:sess});
        //  user.followings.push(followId);
        //  await user.save({session:sess});
         await sess.commitTransaction();
     }
     catch(err){
         console.log(err);
         const error=new HttpError("Couldnt able to store new Following",500);
        return next(error);
     }
     // console.log(response); 
     res.json( 'User followed successfully');
 
 
 });

 router.post("/unlike",checkAuth,async(req,res,next)=>{

    const {PostId}=req.body;
 
    let user=await User.findById(req.user.id);
 
     
     let post;
 
     try{
        post=await Post.findById(PostId);
     }catch(err){
         return next(new HttpError("unliking failed",500));
     }
 
     if(!user){
         return next(new HttpError("Couldnt find user",404));
     }
 
    //  if(userId.toString() !==req.user.id){
    //      return next(new HttpError("Your are not allowed to add ",401));
 
    //  }
    let UIndex=post.likes.indexOf(req.user.id);

 
 
     // let response;
     try{
         //  response=await newTodo.save();
         const sess=await mongoose.startSession();
         sess.startTransaction();
         post.likes.splice(UIndex,1);
         await post.save({session:sess});
         await sess.commitTransaction();
     }
     catch(err){
         console.log(err);
         const error=new HttpError("Couldnt able to store new Following",500);
        return next(error);
     }
     // console.log(response); 
     res.json( 'Post Unliked successfully');
 
 
 });


router.post("/unfollow",checkAuth,async(req,res,next)=>{

   const {unfollowId,userId}=req.body;

   let user=await User.findById(userId);

    
    let fUser;

    try{
        fUser=await User.findById(unfollowId);
    }catch(err){
        return next(new HttpError("unfollowing failed",500));
    }

    if(!fUser){
        return next(new HttpError("Couldnt find user",404));
    }

    if(userId.toString() !==req.user.id){
        return next(new HttpError("Your are not allowed to unfollow ",401));

    }

    let UIndex=fUser.followers.indexOf(userId);
    let FIndex=user.followings.indexOf(unfollowId);






    // let response;
    try{
        //  response=await newTodo.save();
        const sess=await mongoose.startSession();
        sess.startTransaction();
        fUser.followers.splice(UIndex,1);
        await fUser.save({session:sess});
        user.followings.splice(FIndex,1);
        await user.save({session:sess});
        await sess.commitTransaction();
    }
    catch(err){
        console.log(err);
        const error=new HttpError("Couldnt able to store new Following",500);
       return next(error);
    }
    // console.log(response); 
    res.json( 'User UNfollowed successfully');


});

router.get("/posts",checkAuth,async(req,res,next)=>{
    let user;
    let loginUserId=req.user.id;
    try{
        user=await User.findById(loginUserId);
   }
   catch(err){
       console.log(err);
       const error=new HttpError("Couldnt able to find People",500);
      return next(error);
   }
//    console.log(user)

   let followingsPosts=user.followings;


    let posts= await Post.find({creator:{$in:followingsPosts}},null,{sort: {created: -1}}).populate("creator",{name:1}).populate({path:"comments",populate:{path:"user"}});

    // console.log(JSON.parse(JSON.stringify(posts)));
   
    res.json(JSON.parse(JSON.stringify(posts)));
//    res.json(numFruits[0]);
});

// router.get("/comments/:postId",checkAuth,async(req,res,next)=>{
//     let post;
//     let postId=req.params.postId;
//     try{
//         post=await User.findById(postId);
//    }
//    catch(err){
//        console.log(err);
//        const error=new HttpError("Couldnt able to find post",500);
//       return next(error);
//    }
// //    console.log(user)

// //    let commentsPosts=post.comments;


//     let comments= await Comment.find({post:postId},null,{sort: {created: -1}}).populate("user",{name:1});

//     // console.log(JSON.parse(JSON.stringify(posts)));
   
//     res.json(JSON.parse(JSON.stringify(comments)));
// //    res.json(numFruits[0]);
// });

router.post("/comment",checkAuth,async(req,res,next)=>{

   const {body,postId}=req.body;

    const newComment=new Comment({
        body:body,
        user:req.user.id,
        post:postId
    });

    
    let user;

    try{
        user=await User.findById(req.user.id);
    }catch(err){
        return next(new HttpError("adding post failed",500));
    }

    if(!user){
        return next(new HttpError("Couldnt find user",404));
    }

    let post;

    try{
        post=await Post.findById(postId);
    }catch(err){
        return next(new HttpError("adding post failed",500));
    }

    if(!post){
        return next(new HttpError("Couldnt find post",404));
    }

    // if(newPost.user.toString() !==req.user.id){
    //     return next(new HttpError("Your are not allowed to add ",401));

    // }

    // newPost.user=user;


    // let response;
    try{
        //  response=await newTodo.save();
        const sess=await mongoose.startSession();
        sess.startTransaction();
        await newComment.save({session:sess});
        user.comments.push(newComment);
        await user.save({session:sess});
        post.comments.push(newComment);
        await post.save({session:sess});
        await sess.commitTransaction();
    }
    catch(err){
        console.log(err);
        const error=new HttpError("Couldnt able to store new comment",500);
       return next(error);
    }
    // console.log(response); 
    // let comments=await Comment.find({post:post});
    res.json("comment added");


});



module.exports=router;