const {
    User
} = require('./../../../../database/models')

module.exports = async (_, {
    username
}, {
    req
}) => {
    if (!req.session.userId) {
        throw new Error('You are not logged in')
    }

    let user = await User.findOne({
        where: {
            userId: req.session.userId
        }
    })
    if (!user) {
        throw new Error('user not found')
    }

    if (user.username === username || user.role === "admin" || user.role === "master") {
        await User.destroy({
            where: {
                username
            }
        })
    }
    return true
}