const {
    Message
} = require('./../../../../database/models')
const isAuthorized = require('./../../../helper/isAuthorized')
module.exports = async (_, __, {
    req
}) => {

    const permission = await isAuthorized(req)

    if (permission) {
        return permission
    }
    console.log(permission)
    let messages = await Message.findAll({
        where: {
            userId: req.session.userId
        }
    })
    return messages
}