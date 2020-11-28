const {
    User
} = require('./../../../../database/models');

module.exports = async () => {
    return await User.findAll({})
}