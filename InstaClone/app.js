const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys')

require("dotenv").config();

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})


//dev.js
// module.exports={
//     MONGOURI:"mongodb+srv://rhythmjayee:12345@cluster0.zfsxo.mongodb.net/InstaCloneDB?retryWrites=true&w=majority",
//     JWT_SECRET:"Hi this is secret",
//     SENDGRID_API:"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",
//     EMAIL:"jayeerythm8@gmail.com"
// }