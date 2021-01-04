const {
    UsersItemStore
} = require('./../../../../database/models')

module.exports = async (_, __, {
    req,
    Item
}) => {
    const items = await Item.findAll({
        order: ["id"]
    })
    if (!req.session.userId) {
        return items
    }
    const userFavorite = await UsersItemStore.findAll({
        where: {
            userId: req.session.userId
        }
    })
    let userFavoriteId = userFavorite.map(ele => ele.itemId)

    items.forEach(item => {
        if (userFavoriteId.includes(item.itemId)) {
            item.favorite = true
        }
    });
    return items
}