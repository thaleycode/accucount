const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uri = require('./atlas_uri');

const UserModel = require('./dataModels/UserInfoModel');
const LogInModel = require('./dataModels/LogInModel');
const AcctModel = require('./dataModels/AcctModel')
const JournalEntryModel = require('./dataModels/JournalEntryModel');

const bcrypt = require('bcrypt');
const session = require('express-session');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const multer = require('multer'); // Import and prepare multer for file uploads
const path = require('path');

const app = express();
const port = 3001
//#############################do not post info to github
//#########couldn't get to work
const transporter = nodemailer.createTransport({
  service: '######', // e.g., 'Gmail', 'Outlook'
  auth: {
    user: '#######', // Accucount mailer address
    pass: '######', // Accucount mail email password
  },
});

const isAccountNumberDuplicate = async (accountNumber) => {
  const existingAccount = await AcctModel.findOne({ number: accountNumber });
  return existingAccount !== null;
};

const isAccountNameDuplicate = async (accountName) => {
  const existingAccount = await AcctModel.findOne({ name: accountName });
  return existingAccount !== null;
};

//cookies set up for username - couldnt work
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

app.use((req, res, next) => {
  if (req.session.username) {
    res.setHeader('X-Username', req.session.username);
  }
  next();
});

//
//multer file save setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where files will be saved
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Rename the uploaded file if needed
    const extname = path.extname(file.originalname);
    cb(null, Date.now() + extname);
  },
});

// Create const with storage configuration
const upload = multer({ storage });

// Define a route to handle file uploads
app.post('/upload-file', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // File has been uploaded and saved to the server
  const fileName = req.file.filename; // Get the name of the saved file
  res.status(200).json({ message: 'File uploaded successfully', fileName });
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

//get all acct info from database
app.get('/accounts', async (req, res) => {
  try {
    const accounts = await AcctModel.find();
    res.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
});

//search by acct num
app.get('/account/:accountNumber', async (req, res) => {
  const { accountNumber } = req.params;

  try {
    // Fetch the account details from the database based on the accountNumber
    const account = await AcctModel.findOne({ number: accountNumber });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json(account);
  } catch (error) {
    console.error('Error fetching account details:', error);
    res.status(500).json({ error: 'Failed to fetch account details' });
  }
});

//search journal entries by acct num
app.get('/journalEntries/:accountNumber', async (req, res) => {
  const { accountNumber } = req.params;

  try {
    // get entries where transAmt array contains the desired account number
    // and the status is "approved"
    const journalEntries = await JournalEntryModel.find({
      'transAmt.account': accountNumber,
      status: 'approved',
    });

    res.json(journalEntries);
  } catch (error) {
    console.error('Error fetching approved journal entries:', error);
    res.status(500).json({ error: 'Failed to fetch approved journal entries' });
  }
});


//post to MongoDB

//add user information when account is created

//login to site
app.post('/login/', (req, res) => {
  const { username, password } = req.body;

  LogInModel.findOne({ username: username })
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (err) {
            // Handle bcrypt error
            return res.json({ info: "Login failed: Incorrect password" });
          }
          if (response) {
            req.session.username = user.username;
            req.session.role = user.role;
            console.log(req.session.username);
            res.json({ info: "Logged in", username: req.session.username });
          } else {
            // Incorrect password
            res.json({ info: "Login failed: Incorrect password" });
          }
        });
      } else {
        // User not found
        res.json({ info: "Login failed: User not found" });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred while logging in" });
    });
});

//sumbit new user login info
app.post('/login/add', (req, res) => {
    const {username, email, password, passwordExpiry, active, deactivateDate, reactivateDate, securityQuestion1, securityQuestion2} = req.body
    bcrypt.hash(password, 10)
        .then(hash => {

            //console log to make sure proper output
            const loginInfo = req.body 
            console.log(`Login Information>>>>>>>`, loginInfo)
            console.log('hash: ' + hash )
        
            LogInModel.create({ username, email, password: hash, passwordExpiry, active, deactivateDate, reactivateDate, securityQuestion1, securityQuestion2 })
        
        .then(() => {
          // Handle successful creation
          res.json({ message: 'User registration successful' });
          })
        .catch(error => {
          console.error('Error creating user:', error);
          res.status(500).json('Error creating user');
        });
    });
});
            

//submit new user personal info
app.post('/user/add', (req, res) => {
    const userInfo = req.body;
    console.log(`User Information>>>>>>>`, userInfo); 

    UserModel.create(userInfo);
})

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

// Api to submit journal entries
app.post('/submit-journal-entry', async (req, res) => {
  try {
    const { journalEntry } = req.body;

    // Save journal entry to database
    await JournalEntryModel.create(journalEntry);

    res.status(200).json({ message: 'Journal entry submitted successfully.' });
  } catch (error) {
    console.error('Error submitting journal entry:', error);
    res.status(500).json({ error: 'Failed to submit journal entry.' });
  }
});




////Apis to get info
//check users for logins
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

//get accounts for journal.js dropdown options
app.get('/api/accounts', async (req, res) => {
  const { normalSide } = req.query;
  try {
    const accounts = await AcctModel.find({ normalSide });
    res.json(accounts);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
});

//add accounts to mongodb 
app.post('/account/add', async (req, res) => {
  const {
    accountCategory,
    accountNumber,
    accountName,
    balance,
    comment,
  } = req.body;

  const createdBy = "";
  const dateTimeAdded = new Date();

  // Check for duplicate account number and name (you can reuse your existing functions)
  const isDuplicateNumber = await isAccountNumberDuplicate(accountNumber);
  const isDuplicateName = await isAccountNameDuplicate(accountName);

  if (isDuplicateNumber || isDuplicateName) {
    return res.status(400).json({ error: 'Account number or name already exists' });
  }

  let normalSide = '';

  if (accountCategory === 'equity' || accountCategory === 'liability' || accountCategory === 'income') {
    normalSide = 'Credit';
  } else if (accountCategory === 'asset' || accountCategory === 'expenses') {
    normalSide = 'Debit';
  }

  // Create a new account
  const newAccount = new AcctModel({
    category: accountCategory,
    number: accountNumber,
    name: accountName,
    normalSide: normalSide,
    balance: balance,
    dateTimeAdded: dateTimeAdded,
    createdBy: createdBy,
    comment: comment,
  });

  try {
    await newAccount.save();
    return res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error('Error creating account:', error);
    return res.status(500).json({ error: 'Failed to create account' });
  }
});

app.get('/api/pending-journal-entries', (req, res) => {
  JournalEntryModel.find({})
    .then((entries) => {
      res.json(entries);
    })
    .catch((error) => {
      console.error('Error fetching pending journal entries:', error);
      res.status(500).json({ error: 'Failed to fetch pending journal entries' });
    });
});

app.post('/test', (req, res) => {
  res.json({ message: 'This is a temporary test route.' });
});

app.listen(port, () => console.log("listening on port ", port));
