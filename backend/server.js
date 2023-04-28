const express = require('express')
const app = express()
const cors = require('cors')
const { auth } = require('express-oauth2-jwt-bearer');
const services = require("./services")

require('dotenv').config()
app.use(cors())


const verifyJWT = auth({
    audience: 'http://localhost:8000/',
    issuerBaseURL: process.env.BASE_URL,
    tokenSigningAlg: 'RS256'
  });

app.get("/",(req,res)=>{
    res.json({route:"public"})
})

app.get("/protected",verifyJWT,async (req,res)=>{
    try{
        if(!req.auth.token){
            res.send({message:"unauthorized"})
        }
        let userInfo = await services.getUserInfo(req.auth.token);
        res.send({userInfo:userInfo.data})
    }
    catch(error){
        console.log("hello")
        console.log(error)
    }
})


app.listen(8000,()=>{
    console.log(`Server started on ${process.env.PORT}`)
})