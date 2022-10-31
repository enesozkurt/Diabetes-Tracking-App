const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: buildSchema(`
        type RootQuery {
            records: [String!]!
        }
        type RootMutation {
            createRecord(title: String): String
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
        rootValue: {
            records: () => {
                return ['Breakfast', 'Lunch'];
            },
            createRecord: (args) => {
                const recordTitle = args.title;
                return recordTitle;
            }
        },
        graphiql: true
    })
);

app.listen(3000);