const {
    Order,
    OrderedItem,
} = require('../../../../database/models')


module.exports = async (_, {
    orderId
}, {
    req,
    Item
}) => {
    if (!req.session.userId) {
        return ('you are not logged in')
    }

    let items = await OrderedItem.findAll({
        where: {
            userId: req.session.userId,
            orderId
        }
    })
    items.forEach(async (item) => {
        let dbItem = await Item.findOne({
            where: {
                itemId: item.itemId
            }
        })
        newAmount = item.quantity + dbItem.amount
        await Item.update({
            amount: newAmount
        }, {
            where: {
                itemId: item.itemId
            }
        })
    });

    await OrderedItem.destroy({
        where: {
            orderId
        }
    })
    await Order.destroy({
        where: {
            orderId
        }
    })
    return true
}