const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:30
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,'Please Enter a valid email address']
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"Your password must be longer than 6 character"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true,

        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

//generate password reset token
userSchema.methods.getResetPasswordToken = function(){
    return crypto.randomBytes(20).toString('hex');

   
}


const User = mongoose.models.User || mongoose.model("User",userSchema);
module.exports = User;