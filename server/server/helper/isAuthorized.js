const {
    User
} = require('./../../database/models')
const {
    partialAuth
} = require('./../../server/constant')

const isAuthorized = async (req) => {
    if (!req.session.userId) {
        throw new Error('you are not logged in')
    }
    let user = await User.findOne({
        where: {
            userId: req.session.userId
        }
    })
    if (!partialAuth.includes(user.role)) {
        throw new Error('You are not authorized to this operations')
    }
}

module.exports = isAuthorized