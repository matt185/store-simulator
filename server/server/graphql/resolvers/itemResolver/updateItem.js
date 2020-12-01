const {
    Item
} = require('./../../../../database/models')
const isAuthorized = require('./../../../helper/isAuthorized')

module.exports = async (_, {
    itemId,
    ItemName,
    ItemClass,
    amount,
    minAmount,
    price
}, {
    req
}) => {
    //*  check for permission

    const permission = await isAuthorized(req)

    //*  check if the item is present
    if (permission) {
        return permission
    }
    if (!itemId) {
        throw new Error('item id missing')
    }

    let item = await Item.findOne({
        where: {
            itemId
        }
    })


    if (!item) {
        throw new Error('Item not found')
    }
    //* update the value

    if (ItemName) {
        await Item.update({
            ItemName
        }, {
            where: {
                itemId
            }
        })
    }
    if (ItemClass) {
        await Item.update({
            ItemClass
        }, {
            where: {
                itemId
            }
        })
    }
    if (amount) {
        await Item.update({
            amount
        }, {
            where: {
                itemId
            }
        })
    }
    if (minAmount) {
        await Item.update({
            minAmount
        }, {
            where: {
                itemId
            }
        })
    }
    if (price) {
        await Item.update({
            price
        }, {
            where: {
                itemId
            }
        })
    }

    return await Item.findOne({
        where: {
            itemId
        }
    })
}