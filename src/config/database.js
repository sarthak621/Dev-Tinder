
//url
// mongodb+srv://sarthak621:ZyaQtiaMGoZyFPXS@devtinder.ii0dgke.mongodb.net/

const mongoose=require('mongoose')

// const connectDb== mongodb+srv://sarthak621:ZyaQtiaMGoZyFPXS@devtinder.ii0dgke.mongodb.net/ -> it will return a promise

const connectDb=async()=>{
    await mongoose.connect("mongodb+srv://sarthak621:ZyaQtiaMGoZyFPXS@devtinder.ii0dgke.mongodb.net/devTinder")
}

module.exports=connectDb;
