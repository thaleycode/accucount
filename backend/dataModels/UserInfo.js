const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
    firstName: String, 
    lastName: String,
    street: String,
    city: String,
    state: String,
    zip: Number,
    email: String
});

const UserInfoModel = mongoose.model("userInfo", UserInfoSchema);
module.exports = UserInfoModel;