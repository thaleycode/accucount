//schema for login information

const mongoose = require('mongoose');

const LogInSchema = new mongoose.Schema({
    username: String, 
    email: String,
    password: String,
    passwordExpiry: Date,
    active: {type: Boolean, default: true},
    deactivateDate: Date,
    reactivateDate: Date,
    role: { type: String, default: "user" },
    pastPasswords: [{
        type: String,
    }],
    securityQuestion1: String,
    securityQuestion2: String,
});

const LogInModel = mongoose.model("logInInfo", LogInSchema);
module.exports = LogInModel;