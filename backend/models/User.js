// External imports
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        require : [true, "Please Provide a username"]
    },
    email : {
        type : String,
        require : [true, "Please provide an email"],
        unique : true
    },
    password : {
        type : String,
        require : [true, "Please provide a password"]
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    }
});

module.exports = mongoose.model('User', UserSchema);