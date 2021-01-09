const {
    gql
} = require("apollo-server-express");

module.exports = gql `

type ShoppingBag {
    userId: String!
    itemId: String!
    quantity: Int!
    totPrice: Float!
    onBag:Boolean!
}

extend type Query {
    bags: [ShoppingBag]
}

extend type Mutation{
    addToBag(itemId:String!,quantity:Int!):ShoppingBag
    removeFromBag(itemId:String!):ShoppingBag
    removeAll:Boolean
    incrementAmount(itemId:String!,quantity:Int!):ShoppingBag
    decrementAmount(itemId: String!, quantity: Int!):ShoppingBag
}
`