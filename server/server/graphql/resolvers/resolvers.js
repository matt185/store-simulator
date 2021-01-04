const hello = require('./helloresolver')
//* user
const users = require('./userResolver/users')
const userByUsername = require('./userResolver/userByUsername')
const signUp = require('./userResolver/signUp')
const signIn = require('./userResolver/signIn')
const me = require('./userResolver/meResolver')
const logout = require('./userResolver/logout')
const manageRole = require('./userResolver/manageRole')
const deleteUser = require('./userResolver/deleteUser')
//* item
const addItem = require('./itemResolver/addItem')
const items = require('./itemResolver/items')
const updateItem = require('./itemResolver/updateItem')
const deleteItem = require('./itemResolver/deleteItem')
const updateFavorite = require('./itemResolver/updateFavorite')
const favorites = require('./userResolver/favorites')
module.exports = {
    Query: {
        hello: hello,
        //* user Query
        users: users,
        userByUsername: userByUsername,
        favorites,
        me: me,
        //* item Query
        items: items,

    },
    Mutation: {
        //* user Mutation
        signUp,
        signIn,
        logout,
        manageRole,
        deleteUser,
        //* item Mutation
        addItem,
        updateItem,
        deleteItem,
        updateFavorite
    }
}