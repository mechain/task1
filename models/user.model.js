const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required: true
    },
    lastname: {
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone: {
        type:Number,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    isAdmin: {
        type:Boolean
    },
    accountStatus:{
        type:String,
        enum: ['block','active','pending'],
        default: 'pending'
    },
    userListing:{
        type:String,
        enum:['approved','rejected','pending'],
        default: 'pending'
    },

})

const User = mongoose.model("user",userSchema);

module.exports = User;