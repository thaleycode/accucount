//schema for journal entry submission
const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
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
        default: Date.now, // Set to the current date and time
    },
    status: { type: String, default: "pending" },
    denyComment: String
});

const JournalEntryModel = mongoose.model("pendingJournalEntry", JournalEntrySchema);
module.exports = JournalEntryModel;