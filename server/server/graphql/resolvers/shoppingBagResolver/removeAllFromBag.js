const {
    ShoppingBag
} = require('../../../../database/models')
module.exports = async (_, __, {
    req,
    Item
}) => {
    if (!req.session.userId) {
        return false
    }
    const bags = await ShoppingBag.findAll({
        where: {
            userId: req.session.userId
        }
    })
    bags.forEach(async (item) => {
        const itemToUpdate = await Item.findOne({
            where: {
                itemId: item.itemId
            }
        })
        const newAmount = itemToUpdate.amount + item.quantity
        await Item.update({
            amount: newAmount
        }, {
            where: {
                itemId: item.itemId
            }
        })
    });
    await ShoppingBag.destroy({
        where: {
            userId: req.session.userId
        }
    })
    return true

}