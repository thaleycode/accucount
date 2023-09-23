const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./dataModels/UserInfo')

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://thaleycode:sNBEIRnci9HAr5aA@accucount.qebcysm.mongodb.net/?retryWrites=true&w=majority/users");

app.get('/getUsers', (req, res) => {
    UserModel.find()
    .then(userInfo => res.json(userInfo))
    .catch(err => res.json(err)) 
})


app.listen(3001, () => {
    console.log("Server running");
})