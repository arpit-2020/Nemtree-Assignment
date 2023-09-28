var mongoose=require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/test').then(()=>{
    console.log("Successfully connected")
});

const express = require("express");
const app =express();
// const expressLayouts = require('express-ejs-layouts');
const userRoute=require('./routes/userRoute');
const homeController=require('./controllers/userController');
const bodyParser = require('body-parser');
// app.use(express.json);
app.set('view engine','ejs');
app.set('views', './views');
app.get("/", function( req , res ){
    return res.render( 'home' , {
        title: "Home" 
    }) ;
} );
app.use('/',userRoute);

app.listen(8000,function(){
    console.log('app is running');
})