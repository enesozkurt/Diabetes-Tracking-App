const Record = require("../../models/record");
const { dateToString } = require('../../helpers/date');
const User = require("../../models/user");
const { transformRecord } = require('./merge')

module.exports = {
    records: async () => {
        try {
            const records = await Record.find()
            return records.map(record => {
                return transformRecord(record)
            })
        } catch (err) {
            throw err;
        }
    },
    createRecord: async (args) => {
        const record = new Record({
            title: args.recordInput.title,
            description: args.recordInput.description,
            bloodGlucose: +args.recordInput.bloodGlucose,
            date: dateToString(args.recordInput.date),
            creator: '636ade0c5430a22c0c23737e'
        });
        let createdRecord;
        try {
            const result = await record
                .save()
            createdRecord = transformRecord(result);
            const creator = await User.findById('636ade0c5430a22c0c23737e')
            if (!creator) {
                throw new Error('User not found.')
            }
            creator.createdRecords.push(record);
            await creator.save();
            return createdRecord;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
}