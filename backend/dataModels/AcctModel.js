//schema to submit/handle accounts in chart of accounts

const mongoose = require('mongoose');

const AcctSchema = new mongoose.Schema({
    category: String,
    number: String,
    name: String, 
    normalSide: String,
    balance: Number,
    journals: [{
        transDate: Date,
        transNumber: Number,
        transAmt: [{
            account: Number,
            side: String,
            amount: Number,
        }],
        comments: String,
        filePath: String, //location on server
        user: String,
        submitDate: {
            type: Date,
        }
    }],
    dateTimeAdded: { type: Date, default: Date.now,},
    createdBy: String,
    comment: String
});

const AcctModel = mongoose.model("accounts", AcctSchema);
module.exports = AcctModel;