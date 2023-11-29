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
    const resetToken= crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
}


const User = mongoose.models.User || mongoose.model("User",userSchema);
module.exports = User;