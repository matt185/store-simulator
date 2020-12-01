const {
    Item
} = require('./../../../../database/models')
const isAuthorized = require('./../../../helper/isAuthorized')

module.exports = async (_, {
    itemId
}, {
    req
}) => {
    const permission = await isAuthorized(req)

    if (permission) {
        return permission
    }
    await Item.destroy({
        where: {
            itemId
        }
    })

    return true
}