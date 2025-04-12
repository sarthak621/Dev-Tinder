const express=require('express')

const app=express(); 

//to handle the code
app.use("/test",(req,res)=>{
    res.send("hello from the server")
})

app.use("/hello",(req,res)=>{
    res.send("hello hi kar lo ")
})

app.use("/hanuman",(req,res)=>{
    res.send("jai hanuman dada")
})

app.use("/krishn",(req,res)=>{
    res.send("jai shree radha madhav")
})
app.use((req,res)=>{
    res.send("jai shree ram ")
})


app.listen(3000,()=>{
    console.log("server is successfully running on port 3000")
})
console.log("first")