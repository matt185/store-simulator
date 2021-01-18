const {
    Todos
} = require('../../../../database/models')
const isAuthorized = require('../../../helper/isAuthorized')
module.exports = async (_, __, {
    req
}) => {

    const permission = await isAuthorized(req)

    if (permission) {
        return permission
    }
    let messages = await Todos.findAll({
        where: {
            userId: req.session.userId
        },
        order: [
            ['id', 'ASC'],

        ]
    })
    return messages
}