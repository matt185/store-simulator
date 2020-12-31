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
    if (username.length === 0) {
        return {
            error: {
                field: "username",
                message: "Insert a username"
            }
        }
    }
    if (password.length === 0) {
        return {
            error: {
                field: "password",
                message: "Insert a password"
            }
        }
    }
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
    return {
        user: user
    }
}