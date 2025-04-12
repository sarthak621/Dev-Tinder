const express=require('express')

const app=express()

app.use("/test",(req,res)=>{
    res.send("ho gaya request handler check")
})

app.use((req,res)=>{
    res.send("aa gaya server me ")
})


app.listen(7777,()=>{
    "connected to server"
})