const {
    gql
} = require("apollo-server-express");

module.exports = gql `

type ShoppingBag {
    userId: String!
    itemId: String!
    quantity: Int!
    TotalPrice: Float
    onBag:Boolean!
     createdAt: Date
     updatedAt: Date
}

extend type Query {
    bags: [ShoppingBag]
}

extend type Mutation{
    addToBag(itemId:String!,quantity:Int!):ShoppingBag!
    removeFromBag(itemId:String!):ShoppingBag!
    removeAllFromBag:Boolean
    # incrementAmount(itemId:String!,quantity:Int!):ShoppingBag!
    # decrementAmount(itemId: String!, quantity: Int!):ShoppingBag!
}
`