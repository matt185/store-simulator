const {
    Order,
    OrderedItem,
    ShoppingBag
} = require('../../../../database/models')
const {
    v4: uuidv4
} = require('uuid')
module.exports = async (_, __, {
    req
}) => {
    if (!req.session.userId) {
        return ('you are not logged in')
    }
    const orderId = uuidv4()



    const bag = await ShoppingBag.findAll({
        where: {
            userId: req.session.userId
        }
    })
    const totalPrice = bag.map(item => item.TotalPrice).reduce((a, b) => a + b)
    const totalAmount = bag.map(item => item.quantity).reduce((a, b) => a + b)
    const newOrderData = {
        userId: req.session.userId,
        orderId: orderId,
        itemAmount: totalAmount,
        status: "ordered",
        price: Math.round(totalPrice * Math.pow(10, 2)) / Math.pow(10, 2)

    }

    bag.forEach(async item => {
        await OrderedItem.create({
            userId: item.dataValues.userId,
            itemId: item.dataValues.itemId,
            quantity: item.dataValues.quantity,
            TotalPrice: item.dataValues.TotalPrice,
            orderId: orderId
        })
    });
    await Order.create(
        newOrderData
    )
    let newOrder = await Order.findOne({
        where: {
            orderId
        }
    })
    let itemList = await OrderedItem.findAll({
        where: {
            orderId
        }
    })

    newOrder.itemList = itemList
    await ShoppingBag.destroy({
        where: {
            userId: req.session.userId
        }
    })
    return newOrder
}