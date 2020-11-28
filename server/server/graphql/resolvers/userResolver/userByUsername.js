const {
    User
} = require('./../../../../database/models')

module.exports = async (_, {
    username
}) => {
    let user = await User.findOne({
        where: {

            username

        }
    })
    console.log(user)
    return user
}