const {
    Todos
} = require('../../../../database/models')
const isAuthorized = require('../../../helper/isAuthorized')
module.exports = async (_, {
    todoId
}, {
    req
}) => {

    const permission = await isAuthorized(req)

    if (permission) {
        return permission
    }
    let todo = await Todos.findOne({
        where: {
            todoId
        }
    })
    if (!todo) {
        return false
    }
    await Todos.update({
        status: !todo.status
    }, {
        where: {
            todoId
        }
    })
    return true
}