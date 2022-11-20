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
    createRecord: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!')
        }
        const record = new Record({
            title: args.recordInput.title,
            description: args.recordInput.description,
            bloodGlucose: +args.recordInput.bloodGlucose,
            date: dateToString(args.recordInput.date),
            creator: req.userId
        });
        let createdRecord;
        try {
            const result = await record
                .save()
            createdRecord = transformRecord(result);
            const creator = await User.findById(req.userId)
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