require('dotenv').config()
const {
    User
} = require('./../../../../database/models')
const bcrypt = require('bcrypt')


module.exports = async (_, {
    username,
    password
}, {
    req
}) => {
    const user = await User.findOne({
        where: {
            username
        }
    })
    if (!user) {
        return {
            error: {
                field: "username",
                message: "username not found"
            }
        }
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
        return {
            error: {
                field: "password",
                message: "password not correct"
            }
        }
    }

    req.session.userId = user.userId
    console.log(req.session.userId)
    return {
        user: user
    }
}