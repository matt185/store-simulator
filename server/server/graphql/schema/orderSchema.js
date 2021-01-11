const {
    gql
} = require("apollo-server-express");


module.exports = gql `
# order type definitions

type Order{
    userId:String!
    orderId:String
    status:String!
    price:Float!
    itemAmount:Int!
    itemList:[ItemOrdered]
}

type ItemOrdered{
    userId: String!
    itemId: String!
    quantity: Int!
    price:Float
    TotalPrice: Float!
    onBag: Boolean
    createdAt: Date
    updatedAt: Date
}

extend type Query{
    orders:[Order]
    itemsOrdered:[ItemOrdered]
}

extend type Mutation{
    newOrder:Order
    updateOrder(orderId:String):Order
    deleteOrder(orderId:String!):Order
}
`