const express = require("express");
const user=express();
// const user = express.Router() ;
const multer=require('multer');
const path = require('path');
const bodyParser = require ('body-parser');
const userController = require('../controllers/userController.js')


user.use(bodyParser.urlencoded({extended : true}));
user.use(express.static(path.resolve(__dirname,'public')));
   var storage = multer.diskStorage({
    destination:(req,file,cb) =>{
     cb(null,'./public/uploads')
    },
        filename:(req,file,cb) =>{
            cb(null,file.originalname)
        }
    
})
var upload = multer({storage:storage});
// user.get('/importUser',userController.RenderUpload);
user.post('/importUser',upload.single('excelFile'),userController.importUser)
user.get("/thankyou", function( req , res ){
    return res.render( 'thankyou' , {
        title: "upload" 
    }) ;
} );

module.exports = user;