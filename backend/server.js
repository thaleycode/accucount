const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uri = require('./atlas_uri');
const UserModel = require('./dataModels/UserInfo');

const app = express();
const port = 3001

app.use(cors());
app.use(express.json());



mongoose.connect(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

app.get('/', (req, res) => res.status(200).send("Home Page"));

app.listen(port, () => console.log("listening on port ", port));
