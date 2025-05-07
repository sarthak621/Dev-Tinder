- create a repo ✅
- initialize the repo ✅

- node_modules,package.json,packagelock.json ✅
- intsall express ✅
- create a server ✅
- listen to port ✅
- write request handler for /test /hello routes ✅
- install nodemon and update scripts inside package.json ✅
- diff b/w caret and tilda ✅
- what are dependencies ✅
- what is use of "-g while npm install ✅

- install postman app and make a workspace/collection ->test api call

- write logic to handle GET ,PST ,PATCH,DELETE test them on POSTMAN

- explore routing and use of ?,+,(),* in routers
- use of regex in router /a/ , /*fly$/
- params and query in req


- handling the multiple routes and play with it
- use of next() func and check the errors
- what is middleware
- how express js is handle request route behind the scenes
- diff b/w app.use and app.all
- write a dummy auth middleware for admin
- write a dummy auth middleware for all user routes except user/login
- handling the error  app.use("/",(err,req,res,next)=>{})


- create a free cluster on MOngoDB official website{mongodb atlas}
- install mongoose library
- connect you application to the database "Connection URL/devTinder>"
- call the connect db function and connect to database before starting application on your port

- create userSchema and userModel
- create POST /signup API to add data to database
- push some documents using API calls from postman


- difference b/w json and js object
          	=>JavaScript Object
            format: code syntax
            e.g. const user = {
  name: "Sarthak",
  age: 21,
  isAdmin: true,
  greet: function() {
    console.log("Hello!");
  }
};


            =>JSON 
            format:	String format
            e.g.{
  "name": "Sarthak",
  "age": 21,
  "isAdmin": true
}

- add the express.json middleware to your app
- make your signup API dynamic to receive data from the end user
- user .findOne with duplicate email ids , which object returned
- api to get user by email
- api to get all the users
- api to findByID
- create a  delete user APi
- difference b/w patch and put

     put->replaces the entire resource
     patch-> replaces the partial resource

- create a update user API
- read mongoose docx for models
- what are options in a Model.findOneAndUpdate method , explore more about it
- update the user with EmailID