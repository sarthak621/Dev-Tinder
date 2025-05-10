const validate = require("validator")

//destructuing the signup user object

const validateSignUpData=(req)=>{
 const {firstName,lastName,email,password}=req.body

if(!firstName || !lastName){
    throw new Error("firstname and lastname are required")
}

if(!validate.isEmail(email)){
    throw new Error("Email is not valid")
}

if(!validate.isStrongPassword(password)){
    throw new Error("password is not strong")
 }
}

module.exports={
    validateSignUpData
}