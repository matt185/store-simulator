const {
    User
} = require('./../../../../database/models')
module.exports = async (_, __, {
    req,

    User


}) => {
    if (!req.session.userId) {
        return null
    }
    const user = await User.findOne({
        where: {
            userId: req.session.userId
        }
    })
    return user
}