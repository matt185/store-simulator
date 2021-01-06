const {
    gql
} = require('apollo-server-express')

module.exports = gql `

type Message {
    id:Int!
    userId: String!
    todoId:String!
    title: String!
    text: String!
    type: String!
    status: Boolean!
    createdAt: Date
    updatedAt: Date
}

#* Query definitions
extend type Query{
    todos:[Message]
}
#* mutation definitions
extend type Mutation{
    newTodo(todoId:String!,title:String!, text:String!, type:String!):Message
    updateTodoStatus(todoId:String!):Boolean
    deleteTodo(todoId:String!):Boolean
    deleteCompleteTodos:Boolean
}
`