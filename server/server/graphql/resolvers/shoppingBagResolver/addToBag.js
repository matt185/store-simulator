const {
    ShoppingBag
} = require('../../../../database/models')

module.exports = async (_, {
    itemId,
    quantity
}, {
    req,
    Item
}) => {


    if (!req.session.userId || !itemId) {
        return false
    }
    const item = await Item.findOne({
        where: {
            itemId
        }
    })


    let isOnBag = await ShoppingBag.findOne({
        where: {
            itemId,
            userId: req.session.userId
        }
    })


    if (isOnBag) {
        return "item already present"
    }

    let newAmount = item.amount - quantity

    if (newAmount >= 0) {
        await Item.update({
            amount: newAmount
        }, {
            where: {
                itemId
            }
        })
    } else {
        return
    }

    const newItemId = item.itemId


    const totalPrice = item.price * quantity
    await ShoppingBag.create({
        userId: req.session.userId,
        itemId: newItemId,
        image: item.image,
        quantity: quantity,
        TotalPrice: totalPrice
    })
    const newItem = await ShoppingBag.findOne({
        where: {
            userId: req.session.userId,
            itemId: itemId
        }
    })
    return newItem
}