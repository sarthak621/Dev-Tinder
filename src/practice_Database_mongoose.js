const express=require('express')
const app=express()

// connected database to the application

// H.W => - call the connect db function and connect to database before starting application on your port
const connectDb= require("./config/database.js")


// H.W create POST /signup API to add data to database
const User=require("./models/user.js")

app.use(express.json())      //adding the middleware to parse the json data

app.post("/signup",async(req,res)=>{
    // console.log(req.body)
    //dynamic
    const userData=new User(req.body)

    // // // hardcoded values
    // const userData=new User({
        // firstName:"rohit",
        // lastName:"sharma",
        // email:"rohit@621.com",
        // password:"rohit"
    // })

    try{
        await userData.save()
        res.send("user data has been saved successfully")
    }
    catch(err){
        res.status(500).send("something went wrong")
    }
})



// H.W create GET /user API to get all the data from database
app.get("/user/email",async(req,res)=>{
    const userEmail=req.body.email;
    console.log(userEmail)
    try{
        const user=await User.findOne({email:userEmail})
        if(user){
            res.send(user)
        }
        else{
            res.status(404).send("email not found")
        }
    }

    catch(err){
        res.status(404).send("something went wrong")
    }
})

app.get("/user/id",async(req,res)=>{
    const userId=req.body._id

    try{
        const user=await User.findById({_id:userId})
        if(user){
            res.send(user)
        }
        else{
            res.status(404).send("id not found")
        }
    }

    catch(err){
        res.status(404).send("something went wrong")
    }
})

app.get("/feed",async(req,res)=>{
    try{
        const user=await User.find({})
        if(user){
            res.send(user)
        }
        else{
            res.status(404).send("email not found")
        }
    }
    catch(err){
        res.status(404).send("something went wrong")
    }
})

// create a  delete user APi
app.delete("/user/delete",async(req,res)=>{
    const userId=req.body._id

    try{
        const user=await User.findByIdAndDelete({_id:userId})
        if(user){
            res.send("user deleted successfully")
        }
        else{
            res.status(404).send("email not found")
        }
    }

    catch(err){
        res.status(404).send("something went wrong")
    }
})

// - create a update user API
app.patch("/user/update",async(req,res)=>{
    const userId=req.body._id;
    const data=req.body
    try{
        const user=await User.findByIdAndUpdate({_id:userId},data)
        res.send("user updated successfully")
    }
    catch(err){
        res.status(404).send("something went wrong")
    }
})


//updating by email
app.patch("/user/update/email",async(req,res)=>{
    const userEmail=req.body.email
    const data=req.body
    try{
        const user=await User.findOneAndUpdate({email:userEmail},data, { new: true })
        console.log(user)
        if(user){
            res.send("user updated successfully")
        }
        else{
            res.status(404).send("email not found")
        }
    }
    catch(err){
        res.status(404).send("something went wrong")
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

