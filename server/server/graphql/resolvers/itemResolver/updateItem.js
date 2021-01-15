const {
    Item
} = require('./../../../../database/models')
const isAuthorized = require('./../../../helper/isAuthorized')

module.exports = async (_, {
    id,
    newItemId,
    ItemName,
    ItemClass,
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
            Id
        }
    })


    if (!item) {
        throw new Error('Item not found')
    }
    //* update the value

    if (ItemId) {
        await Item.update({
            itemId: newItemId
        }, {
            where: {
                itemId
            }
        })
    }
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
    if (image) {
        await Item.update({
            image
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