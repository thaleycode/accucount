const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uri = require('./atlas_uri');
const UserModel = require('./dataModels/UserInfoModel');
const LogInModel = require('./dataModels/LogInModel');
const ResetPasswordsModel = require('./dataModels/ResetPasswordsModel');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001
//#############################do not post info to github
const transporter = nodemailer.createTransport({
  service: '######', // e.g., 'Gmail', 'Outlook'
  auth: {
    user: '#######', // Accucount mailer address
    pass: '######', // Accucount mail email password
  },
});

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
    useUnifiedTopology:true,
});

//APIs

//see if user is logged in, return name if true and role for cookies
app.get('/', (req, res) => {
  if (req.session.username) {
    LogInModel.findOne({ username: req.session.username })
      .then((user) => {
        if (user && user.active) {
          const currentDate = new Date();
          if (
            user.deactivateDate &&
            user.reactivateDate &&
            currentDate >= user.deactivateDate &&
            currentDate <= user.reactivateDate
          ) {
            return res.json({ valid: false });
          }
          return res.json({
            valid: true,
            username: req.session.username,
            role: req.session.role,
          });
        }
        return res.json({ valid: false });
      })
      .catch((error) => {
        console.error('Error checking user data:', error);
        res.status(500).json({ error: 'Failed to check user data' });
      });
  } else {
    return res.json({ valid: false });
  }
});



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
        
            LogInModel.create({ username, email, password: hash, passwordExpiry, active, deactivateDate, reactivateDate })
        
                /* #####couldn't get email to work
                .then(newUser => {
                    const mailOptions = {
                        from: 'AccucountMailer@gmail.com', // From Accucount mailer account
                        to: 'AccucountadmTest@gmail.com', // Send to default admin
                        subject: 'New User Registration',
                        text: `A new user with username ${username} has registered on your website. Please go to the user management page at <a href="http://localhost:3000/usermanagement">Accucount</a> to activate the account.`,
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                        console.error('Error sending email:', error);
                        res.status(500).json('Error sending email');
                        } else {
                        console.log('Email sent:', info.response);
                        res.json('User registration successful');
                        }
                    });
                    })
                    .catch(error => {
                    console.error('Error creating user:', error);
                    res.status(500).json('Error creating user');
                    });*/
        });        
})

//submit new user personal in
app.post('/user/add', (req, res) => {
    const userInfo = req.body;
    console.log(`User Information>>>>>>>`, userInfo); 

    UserModel.create(userInfo);
})

//submit security questions and start the reset password entry for the new user
app.post('/security-questions', (req, res) => {
  const { username, securityQuestion1, securityQuestion2 } = req.body;

  // Submit ResetPasswordsModel collection
  ResetPasswordsModel.create({ username, securityQuestion1, securityQuestion2 })
    .then((document) => {
      res.json({ message: 'Security questions saved successfully' });
    })
    .catch((error) => {
      console.error('Error saving security questions:', error);
      res.status(500).json({ error: 'Failed to save security questions' });
    });
});

//deactivate account after 3 failed attempts
app.post('/deactivate-account', (req, res) => {
  const { username } = req.body;

  // Update the user's account to set "active" to false
  LogInModel.updateOne({ username }, { active: false })
    .then(() => {
      res.json({ message: 'Account deactivated successfully' });
    })
    .catch((error) => {
      console.error('Error deactivating account:', error);
      res.status(500).json({ error: 'Failed to deactivate account' });
    });
});

//update users from UserManagement.js page
app.post('/update-users', async (req, res) => {
  const updatedUsers = req.body.updatedUsers;

  try {
    // Update user data in the MongoDB database
    for (const user of updatedUsers) {
      const { _id, role, active, deactivateDate, reactivateDate } = user;

      // Find the user by _id and update the fields
      await LogInModel.findByIdAndUpdate(
        _id,
        {
          role,
          active,
          deactivateDate,
          reactivateDate,
        },
        { new: true }
      );
    }

    res.json({ message: 'Changes saved successfully' });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Failed to update user data' });
  }
});



////get info from MongoDb
app.get('/users', (req, res) => {
  LogInModel.find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error('Error fetching user data:', err);
      res.status(500).json({ error: 'Failed to fetch user data' });
    });
});

app.listen(port, () => console.log("listening on port ", port));
