const {
    gql
} = require('apollo-server-express')

module.exports = gql `

type Message {
    id:Int!
    userId: String!
    todosId:String!
    title: String!
    text: String!
    type: String!
    status: Boolean!
    createdAt: Date
    updatedAt: Date
}

#* Query definitions
extend type Query{
    messages:[Message]
}
#* mutation definitions
extend type Mutation{
    newMessage(title:String!, text:String!, type:String!):Message
    updateStatus(id:Int!):Boolean
    deleteMessage(id:Int):Boolean
}
`