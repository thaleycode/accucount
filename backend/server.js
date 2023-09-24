const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uri = require('./atlas_uri');
const UserModel = require('./dataModels/UserInfo');
const LogInModel = require('./dataModels/LogIn');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001

app.use(cors());
app.use(express.json());



mongoose.connect(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//APIs

//test port to see if backend is functional
app.get('/', (req, res) => res.status(200).send("Home Page"));

//post to MongoDB

//add user information when account is created
app.post('/login/add', (req, res) => {
    const loginInfo = req.body;

    LogInModel.create(loginInfo);
})

app.post('/user/add', (req, res) => {
    const userInfo = req.body;
    console.log(`User Information>>>>>>>`, userInfo); 

    UserModel.create(userInfo);
})

app.listen(port, () => console.log("listening on port ", port));
