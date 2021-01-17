const {
    Item
} = require('./../../../../database/models')
const isAuthorized = require('./../../../helper/isAuthorized')

module.exports = async (_, {
    id,
    newItemId,
    itemName,
    itemClass,
    amount,
    minAmount,
    price,
    image
}, {
    req
}) => {
    //*  check for permission
    const permission = await isAuthorized(req)

    //*  check if the item is present
    if (permission) {
        return permission
    }
    if (!id) {
        throw new Error('item id missing')
    }

    let item = await Item.findOne({
        where: {
            itemId: id
        }
    })


    if (!item) {
        throw new Error('Item not found')
    }
    //* update the value

    if (newItemId) {
        await Item.update({
            itemId: newItemId
        }, {
            where: {
                itemId: id
            }
        })
    }
    if (itemName) {
        await Item.update({
            itemName
        }, {
            where: {
                itemId: id
            }
        })
    }
    if (itemClass) {
        await Item.update({
            itemClass
        }, {
            where: {
                itemId: id
            }
        })
    }
    if (amount) {
        await Item.update({
            amount
        }, {
            where: {
                itemId: id
            }
        })
    }
    if (minAmount) {
        await Item.update({
            minAmount
        }, {
            where: {
                itemId: id
            }
        })
    }
    if (price) {
        await Item.update({
            price
        }, {
            where: {
                itemId: id
            }
        })
    }
    if (image) {
        await Item.update({
            image
        }, {
            where: {
                itemId: id
            }
        })
    }

    return await Item.findOne({
        where: {
            itemId: id
        }
    })
}