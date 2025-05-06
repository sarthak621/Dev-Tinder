const express= require('express')
const app = express()

                // 1 middleware function
// //H.W
// // - write a dummy auth middleware for admin
// // - write a dummy auth middleware for all user routes except user/login

// //making a separate middleware for user in the middleware folder {best method ensures clean code}
// const userAuth=require("./middleware/auth.js")
// // app.use("/user",userAuth)                     //{correct}

// app.use("/admin",(req,res,next)=>{
//     console.log("checking the admin auth")
//     const token="xyz"
    
//     const isAdminAuthorized= token==="xyz";
//     if(!isAdminAuthorized){
//         res.status(401).send("unauthoruized user")
//     }
//     next()
// });


// app.get("/user/loggedin",(req,res)=>{
//     res.send("user logged in successfully")
// })

// app.get("/user/data",userAuth,(req,res)=>{   //{You can insert middleware functions between the route path and the final request handler. Each middleware gets called in sequence.}
//     res.send("getting the data for all the users")
// })

// app.get("/admin/getAllData",(req,res)=>{
//     res.send("admin gets all the data")
// })

// app.get("/admin/deleteData",(req,res)=>{
//     res.send("All data has been deleted")
// })



                        // 2 handling the error

//type I                        
// app.use("/kuchbhi",(req,res)=>{
//     throw new Error(" ha ha error aa gaya")
// })

//  app.use("/",(err,req,res,next)=>{
//     if(err){
//         res.status(500).send("something went wrong");
//     }
//  })     
 
 
 //type II -> we can also handle the error using try catch block
 app.use("/kuchbhi",(req,res)=>{
    try{
    throw new Error(" ha ha error aa gaya")}

    catch{
        res.status(500).send("something went wrong contact to support team")
    }
})

 app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong");
    }
 })     
 






        

//adding to the port
app.listen(6211,()=>{
    console.log("connected to the port")
})