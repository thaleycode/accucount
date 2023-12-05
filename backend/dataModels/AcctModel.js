//schema to submit/handle accounts in chart of accounts

const mongoose = require('mongoose');

const AcctSchema = new mongoose.Schema({
    category: String,
    number: String,
    name: String, 
    normalSide: String,
    balance: Number,
    journals: [{
        number: Number
    }],
    dateTimeAdded: { type: Date, default: Date.now,},
    createdBy: String,
    comment: String
});

const AcctModel = mongoose.model("accounts", AcctSchema);
module.exports = AcctModel;