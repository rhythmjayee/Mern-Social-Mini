const express=require("express")
const router =express.Router();

const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")
const {check,validationResult} =require("express-validator");


const HttpError=require("../models/HttpError");
const User=require("../models/user"); 
const checkAuth =require("../config/authCheck");





router.post("/signup",
    [
        check("name").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({min:6})
    ],
    async(req,res,next)=>{
        const error=validationResult(req);
        console.log(error.errors);
        if(error.errors.length!==0){
            return next(new HttpError("Invalid inputs passed",422));
        }
    const {name,email,password}=req.body;

    let existinqUser;
    try{
        existinqUser=await User.findOne({email:email});
    }
    catch(err){
        return next(new HttpError("SignUp failed,please try again later",500));
    }

    if(existinqUser){
        return next(new HttpError("User exists",422));
    }

    let hashedPassword;
    hashedPassword= await bcrypt.hash(password,12);

    const newUser=new User({
        name,
        email,
        password: hashedPassword,
        posts:[]
    });

        try{
            await newUser.save();
        }catch(err){
            return next(new HttpError("Creating User failed",500));
        }

        let token;
        token=jwt.sign({userId:newUser.id,email:newUser.email},
            "Secret_Key",
            {expiresIn:3600}
            )


        res.json({userId:newUser.id,email:newUser.email,token:token});

});

router.post("/login",async(req,res,next)=>{
    const {email,password}=req.body;
    
    let existinqUser;

    try{
        existinqUser=await User.findOne({email:email});
    }
    catch(err){
        return next(new HttpError("SignUp failed,please try again later",500));
    }

    if(!existinqUser){
        return next(new HttpError("Ivalid credentials",401));
    }

    let isValidPassword= await bcrypt.compare(password,existinqUser.password)
    
    if(!isValidPassword){
        return next(new HttpError("Ivalid credentials",401));
    }

    let token;
    token=jwt.sign({userId:existinqUser.id,email:existinqUser.email},
        "Secret_Key",
        {expiresIn:"1h"}
        )

    res.json({userId:existinqUser.id,email:existinqUser.email,token:token});


     
});

router.get("/user",checkAuth, async(req,res)=>{
   const user=await User.findById(req.user.id).select('-password');
   console.log(user);
   res.json(user);
})


module.exports=router;