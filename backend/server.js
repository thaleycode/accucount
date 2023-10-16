const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uri = require('./atlas_uri');
const UserModel = require('./dataModels/UserInfoModel');
const LogInModel = require('./dataModels/LogInModel');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const port = 3001

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());
app.use(cookie());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))
 


mongoose.connect(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//APIs

//see if user is logged in, return name if true
app.get('/', (req, res) => {
    if (req.session.username) {
        return res.json({valid: true, username: req.session.username, role: req.session.role})
    } else {
        return res.json({valid: false})
    }
})



//post to MongoDB

//add user information when account is created

//login to site
app.post('/login/', (req,res) => {
    const {username, password} = req.body;
    LogInModel.findOne({username: username})
    .then (user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if (err) {
                    return res.json("Incorrect password")
            }
                if (response) {
                    req.session.username = user.username;
                    req.session.role = user.role;
                    console.log(req.session.username);
                    res.json({info: "Logged in", username: req.session.username})
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
