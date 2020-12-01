const {
    gql
} = require("apollo-server-express");

module.exports = gql `
 #* Item Type definitions
type Item{
    itemId:String!
    itemClass:String!
    itemName:String!
    amount:Int!
    minAmount:Int!
    price:Float
    created_At:Date
    updated_At:Date
}

type ItemTake {
    userId: String
    id: String
    itemClass: String
    itemName: String
    amount: Int
    price: String
}

extend type Query {
    items: [Item]
    itemByClass(itemClass: String): [Item]
    itemsTakeByUser(userId: String): [Item]
    itemsTake: [ItemTake]
}

extend type Mutation{
    addItem(itemId:String!,itemClass: String!, itemName: String!, amount: Int!, minAmount: Int!, price: Float!):Item
    updateItem(itemId: String, itemClass: String, itemName: String, amount: Int, minAmount: Int, price: Float): Item
    deleteItem(itemId:String!):Boolean!
}

`