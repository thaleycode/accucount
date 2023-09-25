const mongoose = require('mongoose');

const LogInSchema = new mongoose.Schema({
    username: String, 
    email: String,
    password: String,
    passwordExpiry: Date,
    active: {type: Boolean, default: false},
    deactivateDate: Date,
    reactivateDate: Date
});

const LogInModel = mongoose.model("logIn", LogInSchema);
module.exports = LogInModel;