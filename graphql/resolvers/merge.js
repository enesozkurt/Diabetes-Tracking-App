const Record = require("../../models/record");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

const records = async recordIds => {
    try {
        const records = await Record.find({_id: {$in: recordIds}})
        return records.map(record => {
            return transformRecord(record);
        });
    }
    catch (err) {
        throw err;
    }
}

const singleRecord = async recordId => {
    try {
        const record = await Record.findById(recordId);
        return transformRecord(record)
    } catch (err) {
        throw err;
    }
}

const user = async userId => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            _id: user.id,
            createdRecords: records.bind(this, user._doc.createdRecords)
        };
    } catch (err) {
        throw err;
    }
}

const transformRecord = record => {
    return {
        ...record._doc,
        _id: record.id,
        date: dateToString(record._doc.date),
        creator: user.bind(this, record.creator)
    }
}

exports.transformRecord = transformRecord;
// exports.user = user;
// exports.records = records;
// exports.singleRecord = singleRecord;