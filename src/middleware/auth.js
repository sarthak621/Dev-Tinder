// const userAuth=(req,res,next)=>{
//     console.log("checking the user auth")
//     const token="abc"
    
//     const isAdminAuthorized= token==="abc";
//     if(!isAdminAuthorized){
//         res.status(401).send("unauthoruized user")
//     }
//     next()
// }

// // export default userAuth;
// module.exports = userAuth;


const jwt = require("jsonwebtoken")
const User=require("../models/user")

const userAuth=async(req,res,next)=>{
    // read the token from the req cookies
   try{
     const {token}=req.cookies
     if(!token){
        throw new Error("token not found")
     }

     const decodedObj=jwt.verify(token,"DEV@TINDER$790")
     const {_id}=decodedObj;
 
     const user=await User.findById(_id)
     if(!user){
         throw new Error("user not found")
     }

     req.user=user
     next();
   }
   catch(err){
    res.status(400).send("ERROR:"+ err.message)
   }
}

module.exports = userAuth;