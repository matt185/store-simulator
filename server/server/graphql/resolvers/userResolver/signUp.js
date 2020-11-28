const {
    User
} = require('./../../../../database/models')
const bcrypt = require('bcrypt')
require('dotenv').config();

module.exports = async (_, {
    username,
    email,
    password
}, {
    req
}) => {

    //*  check on username
    if (username.length < 4) {
        return {
            error: {
                field: "username",
                message: "username have to be at least 4 characters"
            }
        }
    }
    let checkUser = await User.findOne({
        where: {
            username
        }
    })
    if (checkUser) {
        return {
            error: {
                field: "username",
                message: "username already exist"
            }
        }
    }
    //*  check on  email
    if (!email.includes(`@`) || email.length < 4) {
        return {
            error: {
                field: "email",
                message: "email not valid"
            }
        }
    }
    checkUser = await User.findOne({
        where: {
            email
        }
    })
    if (checkUser) {
        return {
            error: {
                field: "email",
                message: "email already exist"
            }
        }
    }
    //*  check password

    if (password.length < 4) {
        return {
            error: {
                field: "password",
                message: "password have to be at least 4 characters"
            }
        }
    }
    //*  set default role

    let allUser = await User.findAll({})

    let role = "user"
    if (allUser.length === 0) {
        role = "admin"
    }
    let hashedPsw = await bcrypt.hash(password, 10)

    await User.create({
        username: username,
        email: email,
        password: hashedPsw,
        role: role
    })
    let newUser = await User.findOne({
        where: {
            username
        }
    })
    req.session.userId = newUser.userId
    console.log(req.session.userId)
    return {
        user: newUser
    }




}