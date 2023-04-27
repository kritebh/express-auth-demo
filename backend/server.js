const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('express-jwt')
const { auth } = require('express-oauth2-jwt-bearer');

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

app.get("/protected",verifyJWT,(req,res)=>{
    res.json({route:"private"})
})


app.listen(8000,()=>{
    console.log(`Server started on ${process.env.PORT}`)
})