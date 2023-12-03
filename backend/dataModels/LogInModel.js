const mongoose = require('mongoose');

const LogInSchema = new mongoose.Schema({
    username: String, 
    email: String,
    password: String,
    passwordExpiry: Date,
    active: {type: Boolean, default: true},
    deactivateDate: Date,
    reactivateDate: Date,
    role: { type: String, default: "user" }
});

const LogInModel = mongoose.model("logInInfo", LogInSchema);
module.exports = LogInModel;