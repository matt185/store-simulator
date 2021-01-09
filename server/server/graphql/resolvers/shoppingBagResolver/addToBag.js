const {
    shoppingBag
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

    let item = await UsersItemStore.findOne({
        where: {
            itemId,
            userId: req.session.userId
        }
    })
}