var mongoose=require('mongoose');
var userSchema=new mongoose.Schema({
    Name : {
        type:String
    },
    Email : {
        type:String
    },
    MobileNo : {
        type:String
    },
    DateofBirth : {
        type:String
    },
    
    WorkExperience  : {
        type:String
    },
    ResumeTitle : {
        type:String
    },
    CurrentLocation: {
        type:String
    },
    PostalAddress: {
        type:String
    },
    CurrentEmployer: {
        type:String
    },
    CurrentDesignation : {
        type:String
    }
    

})
module.exports=mongoose.model('User',userSchema);