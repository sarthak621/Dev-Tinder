const express=require('express')
const app=express()

// connected database to the application

// H.W => - call the connect db function and connect to database before starting application on your port
const connectDb= require("./config/database.js")


// H.W create POST /signup API to add data to database
const User=require("./models/user.js")
app.post("/signup",async(req,res)=>{
    const userData=new User({
        firstName:"rohit",
        lastName:"sharma",
        email:"rohit@621.com",
        password:"rohit"
    })

    try{
        await userData.save()
        res.send("user data has been saved successfully")
    }
    catch(err){
        res.status(500).send("something went wrong")
    }
})


connectDb().then(()=>{
    console.log("database connected successfully")
    app.listen(7777,()=>{
        console.log("connected to the port")
    })
})
.catch(()=>{
    console.error("database connection failed")
})

