const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
    name:{
        String
    },
    email:{
        type:String,
        
    },
    phone:Number,
    test:{
        type:String
    },
    password:String,
})
const Login = new mongoose.model('Login',LoginSchema);
module.exports=Login;

