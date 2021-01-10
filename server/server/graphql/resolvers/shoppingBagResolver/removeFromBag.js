const {
    ShoppingBag
} = require('./../../../../database/models')

module.exports = async (_, {
    itemId
}, {
    req,
    Item
}) => {
    if (!req.session.userId) {
        return ('you are not logged in');
    }
    let item = await ShoppingBag.findOne({
        where: {
            userId: req.session.userId,
            itemId
        }
    })

    if (!item) {
        return (" Item not found")
    }

    let itemToUpdate = await Item.findOne({
        where: {
            itemId
        }
    })
    let newAmount = itemToUpdate.amount + item.quantity

    await Item.update({
        amount: newAmount
    }, {
        where: {
            itemId
        }
    })
    await ShoppingBag.destroy({
        where: {
            userId: req.session.userId,
            itemId
        }
    })

    return item

}