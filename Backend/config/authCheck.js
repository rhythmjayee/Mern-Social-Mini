const jwt =require("jsonwebtoken");
const HttpError=require("../models/HttpError");



module.exports=(req,res,next)=>{
    if(req.method==="OPTIONS"){
        return next();
    }
    // console.log(req.headers.authorization)

    try{
        const token=req.header('x-auth-token');
        // const token=req.headers.authorization.split(" ")[1];
        if(!token){
           throw new Error("Authenication failed",401);

        }
       const decodedToken= jwt.verify(token,"Secret_Key");
       req.user={id:decodedToken.userId};
       next();

    }catch(err){
        return next(new HttpError("Authenication failed",401))

    }
    
}