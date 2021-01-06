const {
    Todos
} = require('../../../../database/models')
const isAuthorized = require('../../../helper/isAuthorized')
module.exports = async (_, {
    title,
    text,
    type
}, {
    req
}) => {

    const permission = await isAuthorized(req)

    if (permission) {
        return permission
    }

    return await Todos.create({
        userId: req.session.userId,
        title,
        text,
        type,
        status: false
    })


}