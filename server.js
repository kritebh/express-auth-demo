const express = require('express')
const app = express()


app.get("/",(req,res)=>{
    res.send("Homepage")
})



app.listen(3000,()=>{
    console.log("Server is started on 3000 PORT")
})