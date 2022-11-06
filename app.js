const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const Record = require('./models/record')
const User = require('./models/user')

const app = express();

app.use(bodyParser.json());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: buildSchema(`
        type Record {
            _id: ID!
            title: String!
            description: String
            bloodGlucose: Int!
            date: String!
        }
        
        type User {
            _id: ID!
            email: String!
            password: String
        }
        
        input RecordInput {
            title: String!
            description: String
            bloodGlucose: Int!
            date: String!
        }
        
        input UserInput {
            email: String!
            password: String!
        }
        
        type RootQuery {
            records: [Record!]!
        }
        type RootMutation {
            createRecord(recordInput: RecordInput): Record
            createUser(userInput: UserInput): User
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
        rootValue: {
            records: () => {
                return Record.find().then(events => {
                    return events.map(event => {
                        return { ...event._doc }
                    })
                }).catch(err => {
                    throw err;
                });
            },
            createRecord: (args) => {
                const record = new Record({
                    title: args.recordInput.title,
                    description: args.recordInput.description,
                    bloodGlucose: +args.recordInput.bloodGlucose,
                    date: new Date(args.recordInput.date),
                    creator: '63681d1ffa5f3157771389d0'
                });
                let createdRecord;
                return record
                    .save()
                    .then(result => {
                        createdRecord = { ...result._doc };
                        return User.findById('63681d1ffa5f3157771389d0')
                    })
                    .then(user => {
                        if (!user) {
                            throw new Error('User not found.')
                        }
                        user.createdRecords.push(record);
                        return user.save();
                    })
                    .then(result => {
                        return createdRecord;
                    })
                    .catch(err => {
                    console.log(err)
                    throw err;
                });
                return record;
            },
            createUser: args => {
                return User.findOne({email: args.userInput.email})
                    .then(user => {
                    if (user) {
                        throw new Error('User exist already.')
                    }
                    return bcrypt
                        .hash(args.userInput.password, 12)
                })
                    .then(hashedPassword => {
                        const user = new User({
                            email: args.userInput.email,
                            password: hashedPassword
                        });
                        return user.save()
                    })
                    .then(result => {
                        return { ...result._doc, password: null, _id: result.id }
                    })
                    .catch(err => {
                        throw err;
                    });
            }
        },
        graphiql: true
    })
);

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.d2wtexr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});