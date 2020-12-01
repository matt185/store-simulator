require('dotenv').config()
const __prod__ = process.env.NODE_ENV === "production"

const globalAuth = ["master"]
const partialAuth = ["master", "admin"]


module.exports = {
    __prod__,
    globalAuth,
    partialAuth
}