const express = require('express')
require("dotenv").config()
const app = express()
const { auth,requiresAuth } = require('express-openid-connect');

const config ={
    authRequired:false,
    auth0Logout:true,
    secret:process.env.SECRET,
    baseURL:'http://localhost:3000',
    clientID:process.env.clientID,
    issuerBaseURL:process.env.ISSUER_BASE_URL
}

app.use(auth(config))


app.get("/",(req,res)=>{
    console.log(req.oidc.accessToken)
    res.send(req.oidc.isAuthenticated()?`Name - ${req.oidc.user.nickname} <br> Email - ${req.oidc.user.email}<br> <a href="/logout">Logout</a>`:`<a href="/login">Login<a/>`)
})

app.get("/protected",requiresAuth(),(req,res)=>{
    res.send("Protected Route")
})

app.listen(3000,()=>{
    console.log("Server is started on 3000 PORT")
})