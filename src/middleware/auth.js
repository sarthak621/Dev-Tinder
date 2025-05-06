const userAuth=(req,res,next)=>{
    console.log("checking the user auth")
    const token="abc"
    
    const isAdminAuthorized= token==="abc";
    if(!isAdminAuthorized){
        res.status(401).send("unauthoruized user")
    }
    next()
}

// export default userAuth;
module.exports = userAuth;
