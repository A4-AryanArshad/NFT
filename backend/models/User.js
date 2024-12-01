const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({

    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true,
        unique : true 
    },
    password:{
        type: String,
        required : true
    },
    date:{
        type: Date,
        default:Date.now
    },
    wallet:{
        type: String,
        required:true
    },

    banner:
    {
        type: String,
        default: false


    },

    profile:
    {
        type: String,
        default: false

    },

    isverified:
    {
        type: Boolean,  
        default: false

    },
    verificationcode:
    {
        type: String

    }
   


  });

  const User = mongoose.model('user',UserSchema);

  module.exports = User