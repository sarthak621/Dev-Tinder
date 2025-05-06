const express=require('express')

const app=express(); 

//to handle the code
// app.use("/test",(req,res)=>{
//     res.send("hello from the server")
// })

// app.use("/radha",(req,res)=>{
//      res.send("jai shree radhey")
// })

// app.use("/hello",(req,res)=>{
//     res.send("hello hi kar lo ")
// })

// app.use("/hanuman",(req,res)=>{
//     res.send("jai hanuman dada")
// })

// app.use("/krishn",(req,res)=>{
//     res.send("jai shree radha madhav")
// })
// app.use((req,res)=>{
//     res.send("jai shree ram ")
// })


//handling the multile routes

app.use("/user",
    (req,res,next)=>{
        // res.send("hello from res1")
        console.log("aa gaya res 1 me")
        next()
        // res.send("hello from res1")

    },
    (req,res)=>{
        console.log("aa gaya res 2 me")
        res.send("hello from res2");
    }
)


app.listen(3000,()=>{
    console.log("server is successfully running on port 3000")
})
console.log("first")