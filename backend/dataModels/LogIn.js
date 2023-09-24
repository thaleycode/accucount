const mongoose = require('mongoose');

const LogInSchema = new mongoose.Schema({
    username: String, 
    email: String,
    password: String,
    passwordExpiry: Date,
    active: Boolean,
    deactivateDate: Date,
    reactivateDate: Date
});

const LogInModel = mongoose.model("logIn", LogInSchema);
module.exports = LogInModel;