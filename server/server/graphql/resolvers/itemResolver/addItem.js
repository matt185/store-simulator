const {
    User,
    Item
} = require('./../../../../database/models')
const {
    partialAuth
} = require('./../../../constant')
module.exports = async (_, {
    itemId,
    itemClass,
    itemName,
    amount,
    minAmount,
    price
}, {
    req
}) => {

    if (!req.session.userId) {
        throw new Error('you are not logged in')
    }
    let user = await User.findOne({
        where: {
            userId: req.session.userId
        }
    })

    if (!partialAuth.includes(user.role)) {
        throw new Error('You are not authorized to this operations')
    }
    let item = await Item.findOne({
        where: {
            itemId
        }
    })

    if (item) {
        throw new Error("item ID already present")
    }

    item = await Item.create({
        itemId,
        itemClass,
        itemName,
        amount,
        minAmount,
        price,
        favorite: false,
        onBag: false
    })

    return item
}