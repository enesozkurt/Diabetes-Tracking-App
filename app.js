const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Record = require('./models/record')

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
        
        input RecordInput {
            title: String!
            description: String
            bloodGlucose: Int!
            date: String!
        }
        
        type RootQuery {
            records: [Record!]!
        }
        type RootMutation {
            createRecord(recordInput: RecordInput): Record
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
                    date: new Date(args.recordInput.date)
                });
                return record
                    .save()
                    .then(result => {
                        console.log(result)
                        return { ...result._doc };
                }).catch(err => {
                    console.log(err)
                    throw err;
                });
                return record;
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