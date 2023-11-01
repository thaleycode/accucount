const mongoose = require('mongoose');

const AcctCreationSchema = new mongoose.Schema({
    name: String, 
    number: String,
    description: String,
    normalSide: Number,
    category: String,
    subcategory: String,
    initBalance: Number,
    debit: Number,
    credit: Number,
    dateTimeAdded: Date,
    createdBy: String,
    order: Number,
    statement: String,
    comment: String
});

const AcctCreationModel = mongoose.model("logIn", AcctCreationSchema);
module.exports = AcctCreationModel;