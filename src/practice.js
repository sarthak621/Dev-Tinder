const express=require('express')

const app=express()

// app.use("/user",(req,res)=>{
//     res.send("HA HA HA ")
// })


// works for /abc and /ac also {? is optional chainin g}
// app.get("/ab?c",(req,res)=>{
//     res.send({firstname:"Sarthak" , LastName:"Srivastava"})
// })

// /ab+c -> abc work for /abc and /abbbc also
// /ab*cd ->abKUCHBHIcd abcd abbbcccd

// /ab(cd)?e -> abcd or abe

//this will only handle GET call to /user

app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params)
    res.send({firstname:"Sarthak" , LastName:"Srivastava"})
})

// app.get("/user",(req,res)=>{
//     console.log(req.query)
//     res.send({firstname:"Sarthak" , LastName:"Srivastava"})
// })

// app.get("/user",(req,res)=>{
//     res.send({firstname:"Sarthak" , LastName:"Srivastava"})
// })


app.post("/user",(req,res)=>{
    // console.log("save data to the database")
    res.send("data successfully saved to the DB")
})

app.delete("/user",(req,res)=>{
    // console.log("save data to the database")
    res.send("deleted successfully from the DB")
})


//this will match all HTTP method api calls to test
app.use("/test",(req,res)=>{
    res.send("ho gaya request handler check")
})

// app.use((req,res)=>{
//     res.send("aa gaya server me ")
// })


app.listen(7777,()=>{
    "connected to server"
})