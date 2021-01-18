const {
    User
} = require('./../../../../database/models');

module.exports = async (_, {
    username,
    role
}, {
    req
}) => {
    if (!req.session.userId) {
        throw new Error('You are not logged in')
    }
    let master = await User.findOne({
        where: {
            userId: req.session.userId
        }
    })
    if (master.role !== 'master') {
        throw new Error("You don't have the permission for this operation")
    }

    await User.update({
        role
    }, {
        where: {
            username
        }
    })

    return true

}