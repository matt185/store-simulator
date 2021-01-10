const {
    ShoppingBag
} = require('./../../../../database/models')


module.exports = async (_, __, {
    req
}) => {
    if (!req.session.userId) {

        return ('you are not logged in')
    }

    return await ShoppingBag.findAll({
        where: {
            userId: req.session.userId
        }
    })
}