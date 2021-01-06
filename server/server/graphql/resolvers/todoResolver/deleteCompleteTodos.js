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

    const todo = await Todos.destroy({
        where: {
            status: true
        }
    })
    return todo
}