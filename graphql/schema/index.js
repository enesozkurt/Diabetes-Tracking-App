const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type Record {
            _id: ID!
            title: String!
            description: String
            bloodGlucose: Int!
            date: String!
            creator: User!
        }
        
        type User {
            _id: ID!
            email: String!
            password: String
            createdRecords: [Record!]
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
    `)