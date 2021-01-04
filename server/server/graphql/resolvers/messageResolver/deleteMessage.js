const {
    Message
} = require('./../../../../database/models')
const isAuthorized = require('./../../../helper/isAuthorized')
module.exports = async (_, {
    id
}, {
    req
}) => {

    const permission = await isAuthorized(req)

    if (permission) {
        return permission
    }

    const message = await Message.destroy({
        where: {
            id
        }
    })
    return message

}