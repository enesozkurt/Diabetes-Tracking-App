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
        
        type AuthData {
            userId: ID!
            token: String!
            tokenExpiration: Int!
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
            login(email: String!, password: String!): AuthData!
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