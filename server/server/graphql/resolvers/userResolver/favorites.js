const {
    UsersItemStore
} = require('./../../../../database/models')

module.exports =
    async (_, __, {
        req
    }) => {
        let favorites = await UsersItemStore.findAll({
            where: {
                userId: req.session.userId,
                favorite: true
            }
        })
        return favorites
    }