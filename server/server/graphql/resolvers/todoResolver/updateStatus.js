const {
    Todos
} = require('../../../../database/models')
const isAuthorized = require('../../../helper/isAuthorized')
module.exports = async (_, {
    id
}, {
    req
}) => {

    const permission = await isAuthorized(req)

    if (permission) {
        return permission
    }
    let message = await Todos.findOne({
        where: {
            id
        }
    })
    if (!message) {
        return false
    }
    await Todos.update({
        status: !message.status
    }, {
        where: {
            id
        }
    })
    return true
}