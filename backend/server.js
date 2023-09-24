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

//login to site
app.post('/login/', (req,res) => {
    const {username, password} = req.body;
    const hash = bcrypt
    LogInModel.findOne({username: username})
    .then (user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if (err) {
                    return res.json("Incorrect password")
            }
                if (response) {
                    res.json("Logged in")
                }
            })
        } else {
            res.json("No record exists")
        }

    })
    
})

//sumbit new user login info
app.post('/login/add', (req, res) => {
    const {username, email, password, passwordExpiry, active, deactivateDate, reactivateDate} = req.body
    bcrypt.hash(password, 10)
        .then(hash => {

            //console log to make sure proper output
            const loginInfo = req.body 
            console.log(`Login Information>>>>>>>`, loginInfo)
            console.log('hash: ' + hash )
        
            LogInModel.create({username, email, password: hash, passwordExpiry, active, deactivateDate, reactivateDate});        
        })
})

//submit new user personal in
app.post('/user/add', (req, res) => {
    const userInfo = req.body;
    console.log(`User Information>>>>>>>`, userInfo); 

    UserModel.create(userInfo);
})

app.listen(port, () => console.log("listening on port ", port));
