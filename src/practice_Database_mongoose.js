const express=require('express')
const app=express()

// connected database to the application

// H.W => - call the connect db function and connect to database before starting application on your port
const connectDb= require("./config/database.js")


// H.W create POST /signup API to add data to database
const User=require("./models/user.js")
const {validateSignUpData}=require("./utils/validation.js")
const bcrypt=require("bcrypt")

const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const userAuth=require("./middleware/auth.js")

app.use(cookieParser())

app.use(express.json())      //adding the middleware to parse the json data

app.post("/signup",async(req,res)=>{
    // console.log(req.body)
   

    // //dynamic
    // const userData=new User(req.body)
    // console.log(userData)

    // // // hardcoded values
    // const userData=new User({
        // firstName:"rohit",
        // lastName:"sharma",
        // email:"rohit@621.com",
        // password:"rohit"
    // })

    //validating the data in signup API and encrypting[hash] the password using bcrypt
    try{
       validateSignUpData(req);
       
       //bcrypt returns a promise
       const {firstName, lastName , email , password}=req.body;
       const passwordHash=await bcrypt.hash(password,10)
       const userData=new User({
        firstName, lastName , email , password : passwordHash

       })

        await userData.save()
        res.send("user data has been saved successfully")
         
    }

    // try{
    //     await userData.save()
    //     res.send("user data has been saved successfully")
    // }
    catch(err){
        res.status(500).send("something went wrong"+err.message)
    }
})

app.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user= await User.findOne({email});
        if(!user){
            throw new Error("Invalid credentials")
        }

        const isMatch=await user.validatePassword(password)
        if(isMatch){
            
            //creating a jwt token and expires the jwt token in  1 day 
            
            // const token=await jwt.sign({_id:user._id},"DEV@TINDER$790",{expiresIn:"1D"}) //HIDE DATA AND SECRET KEY
                //  =>writing the user Schema for this
                const token=await user.getJWT()
            //add the token to cookie and send the response
            res.cookie("token",token,{expires:new Date(Date.now()+ 1*24*60*60*1000)}) //1 day;

            res.send("user logged in successfully")
            
        }
        else{
            throw new Error("Invalid credentials")
        }

    }

        catch(err){
        res.status(500).send("something went wrong"+err.message)
    }
})


app.get("/profile",userAuth,async(req,res)=>{
    // const cookies=req.cookies
    // console.log(cookies)

    // const {token}=cookies
    
    
    // try{
    //validate the token
    // const decodedMsg= await jwt.verify(token,"DEV@TINDER$790")

    // const {_id}=decodedMsg;
    
    // const user=await User.findById(_id)

//     if(user){
//         res.send(user)
//     }
//     else{
//         res.status(404).send("user not found")
//     }
//   }

  try{
    const user=req.user
     if(user){
        res.send(user)
    }
    else{
        res.status(404).send("user not found")
    }
  }

  catch(err){
        res.status(500).send("something went wrong"+err.message)
    }
    
})

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user=req.user
    res.send(user.firstName + "sent connection request ")
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
app.patch("/user/update/:userId",async(req,res)=>{
    // const userId=req.body._id;
    const userId=req.params.userId
    console.log(userId)

    const data=req.body
    console.log("Data to update:", data); // Debugging: Check incoming data

    try{

        //  adding api level validation on patch request and signup post api
        const allowedUpdates=["photoURL","about","skills","gender","age"]
        const isUpdateAllowed=Object.keys(data).every((k)=>allowedUpdates.includes(k))
        console.log("Is update allowed?", isUpdateAllowed); // Debugging
        
        if(!isUpdateAllowed){
            throw new Error("udpate not allowed")
        }

        // if(data?.skills.length>10){
        //     throw new Error("skills should be less than 10")
        // }

        if (data?.skills && Array.isArray(data.skills) && data.skills.length > 10) {
            throw new Error("Skills should be less than or equal to 10");
        }
        
        const user=await User.findByIdAndUpdate(userId,data,{runValidators:true})
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

