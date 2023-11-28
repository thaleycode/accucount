const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
    firstName: String, 
    lastName: String,
    street: String,
    city: String,
    state: String,
    zip: Number,
    email: String,
    DOB: Date
});

//test using sub folders in mongodb push 'users/userinfo'
const UserInfoModel = mongoose.model("users/userInfo", UserInfoSchema);
module.exports = UserInfoModel;