const {
    UsersItemStore
} = require('./../../../../database/models')

module.exports =
    async (_, {
        itemId
    }, {
        req,
        Item
    }) => {

        if (!req.session.userId || !itemId) {
            return false
        }

        let item = await UsersItemStore.findOne({
            where: {
                itemId,
                userId: req.session.userId
            }
        })
        console.log(item)
        if (!item) {
            let item = await Item.findOne({
                where: {
                    itemId,
                }
            })
            await UsersItemStore.create({
                userId: req.session.userId,
                itemId: item.itemId,
                itemName: item.itemName,
                itemClass: item.itemClass,
                amount: item.amount,
                price: item.price,
                favorite: true

            })
        } else {
            await UsersItemStore.destroy({
                where: {
                    itemId,
                    userId: req.session.userId
                }
            })
        }
        return true




    }