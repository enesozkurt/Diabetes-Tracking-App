const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    bloodGlucose: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Record', recordSchema);