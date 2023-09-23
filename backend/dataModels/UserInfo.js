const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {first: String, last: String},
    address: {
        street: String,
        city: String,
        state: String,
        zip: Number
    },
    email: String
});

const UserModel = mongoose.model("userInfo", UserSchema);
module.exports = UserModel;