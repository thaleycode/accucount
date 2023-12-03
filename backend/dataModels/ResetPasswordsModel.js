const mongoose = require('mongoose');

const ResetPasswordsSchema = new mongoose.Schema({
    username: String, 
    pastPasswords: [{
        type: String,
    }],
    securityQuestion1: String,
    securityQuestion2: String,
});

const ResetPasswordsModel = mongoose.model("resetPassword", ResetPasswordsSchema);
module.exports = ResetPasswordsModel;