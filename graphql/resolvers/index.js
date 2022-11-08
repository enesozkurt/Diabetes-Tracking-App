const bcrypt = require("bcryptjs");
const Record = require("../../models/record");
const User = require("../../models/user");

const records = async recordIds => {
    try {
        const records = await Record.find({_id: {$in: recordIds}})
        return records.map(record => {
            return {
                ...record._doc,
                _id: record.id,
                date: new Date(record._doc.date).toISOString(),
                creator: user.bind(this, record.creator)
            };
        });
    }
    catch (err) {
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

module.exports = {
    records: async () => {
        try {
            const records = await Record.find()
            return records.map(record => {
                return {
                    ...record._doc,
                    date: new Date(record._doc.date).toISOString(),
                    creator: user.bind(this, record._doc.creator)
                }
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
            date: new Date(args.recordInput.date),
            creator: '636ade0c5430a22c0c23737e'
        });
        let createdRecord;
        try {
            const result = await record
                .save()
            createdRecord = {
                ...result._doc,
                date: new Date(record._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)
            };
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
    },
    createUser: async args => {
        try {
            const existingUser = await User.findOne({email: args.userInput.email})
            if (existingUser) {
                throw new Error('User exist already.')
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12)
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user.save()
            return { ...result._doc, password: null, _id: result.id }
        } catch (err) {
            throw err;
        }
    }
}