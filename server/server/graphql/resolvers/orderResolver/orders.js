const {
    Order,
    OrderedItem
} = require('../../../../database/models')

module.exports = async (_, __, {
    req
}) => {
    if (!req.session.userId) {
        return ('you are not logged in')
    }
    let orderedItem = await OrderedItem.findAll({
        where: {
            userId: req.session.userId
        }
    })
    console.log(orderedItem)
    let ordersList = await Order.findAll({
        where: {
            userId: req.session.userId
        }
    })
    ordersList.map(item => item.itemList = orderedItem.filter(orderedItem => item.orderId === orderedItem.orderId))

    return ordersList
}