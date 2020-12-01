const {
    gql
} = require("apollo-server-express");

module.exports = gql `
#* User type definitions
type User{
    userId:String
    username: String!
    email:String!
    role:String!
    created_at:Date!
    updated_at:Date!
    itemList:[Item]
}

type ErrorField{
    field:String!
    message:String!
}

type Auth{
    user: User
    error: ErrorField
}

#* Query definitions

 extend type Query{
    hello:String
    #* user Query
    users:[User]
    userByUsername(username:String!):User
    me:User
}

#* Mutations definitions

extend type Mutation{
    #* user mutation
    signUp(username:String!, email:String!,password:String!):Auth
    signIn(username:String!,password:String!):Auth
    logout:Boolean
    manageRole(username:String!, role:String!):Boolean
    deleteUser(username:String!):Boolean
}
`