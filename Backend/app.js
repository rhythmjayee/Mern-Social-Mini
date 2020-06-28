const express=require("express")
const bodyParser=require("body-parser");
const mongoose = require('mongoose');
const compress=require("compression");
const helmet= require("helmet");
const cors=require("cors");



const app=express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress());
app.use(helmet());
app.use(cors());


const authRouter=require("./routes/auth");
const userPostRouter=require("./routes/userPost");
const peopleRouter=require("./routes/people");



app.use("/api/auth",authRouter);
app.use("/api/user/post",userPostRouter);
app.use("/api/people",peopleRouter);














app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    } 
    res.status(error.code || 500)
    res.json({message:error.message || "An unknow error occured"});
});

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://rhythm:jayee@cluster0-q75vc.mongodb.net/MernSocial?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    app.listen(5000,()=>{
        console.log("Server started");
    });
})
.catch(err=>{
    console.log(err);
});

