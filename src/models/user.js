const mongoose= require('mongoose')
const validate=require('validator')

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:20
    },
    lastName:{
        type:String,
        minLength:2,
        maxLength:20
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        validate(value){
           if(!validate.isEmail(value)){
            throw new Error("Email is not valid")
           }
        }

    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validate.isStrongPassword(value)){
             throw new Error("password is not Strong")
            }
         }
    },
    age:{
        type:Number,
        min:18,
        max:60
    },
    gender:{
        type:String,
        validate:function(value){
            if(!['male','female','other'].includes(value)){
                throw new Error("Age is not accepted")
            }
        },
        lowercase:true
    },
    photoURL:{
        type:String,
        default:"https://th.bing.com/th/id/R.4a1057c0e050f319b0fb837d3c324a2a?rik=jxgQptaRgGWpcA&riu=http%3a%2f%2fwww.xtivity.com%2fwp-content%2fuploads%2f2015%2f10%2fstaff-dummy4-768x768.jpg&ehk=BsSdQJUJs4osbNzM3foRo8TJtYTAY8RsTRGVnOT4hEU%3d&risl=&pid=ImgRaw&r=0",
        validate(value){
            if(!validate.isURL(value)){
             throw new Error("URL is not valid")
            }
         }
    },
    about:{
        type:String,
        default:"This is default about for the user"
    },
    skills:{
        type:[String]
    }
},
{
    timestamps:true
})

module.exports= mongoose.model("User",userSchema)

//syntax mongoose.model file name and schema name 