const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
       type: String,
       required: true
    },
    createdRecords: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Record'
        }
    ]
})

module.exports = mongoose.model('User', userSchema);