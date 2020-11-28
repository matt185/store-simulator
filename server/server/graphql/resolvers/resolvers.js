const hello = require('./helloresolver')
const users = require('./userResolver/users')
const userByUsername = require('./userResolver/userByUsername')
const signUp = require('./userResolver/signUp')
const signIn = require('./userResolver/signIn')
const me = require('./userResolver/meResolver')
const logout = require('./userResolver/logout')
module.exports = {
    Query: {
        hello: hello,
        //* user Query
        users: users,
        userByUsername: userByUsername,
        me: me

    },
    Mutation: {
        //* user Mutation
        signUp,
        signIn,
        logout
    }
}