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
    image:String
    favorite:Boolean
    onBag:Boolean
    createdAt:Date
    updatedAt:Date
}

type Favorite {
    userId:String
    itemId: String!
    itemClass: String!
    itemName: String!
    image:String
    amount: Int!
    price: Float
    favorite: Boolean
    onBag:Boolean
    createdAt: Date
    updatedAt: Date
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
    favorites:[Favorite]
}

extend type Mutation{
    addItem(itemId:String!,itemClass: String!, itemName: String!,image:String!, amount: Int!, minAmount: Int!, price: Float!):Item
    updateItem(itemId: String, itemClass: String, itemName: String, image: String!, amount: Int, minAmount: Int, price: Float!): Item
    addFavorite(itemId:String!):Boolean!
    updateFavorite(itemId: String!): Item
    deleteItem(itemId:String!):Boolean!
}

`