// const fs = require('fs');
// const path = require('path');

// const typeDefs = fs.readFileSync(path.resolve(__dirname, './schema.graphql'), {
//     encoding: 'utf8'
// });

// module.exports = typeDefs

const {
    gql
} = require('apollo-server-express')
const User = require('./userSchema')
const Item = require('./itemSchema')
const Message = require('./messageSchema')
const baseSchema = gql `
scalar Date

type Query{
    _:Boolean
}

type Mutation{
    _:Boolean
}
`
module.exports = [baseSchema, User, Item, Message]