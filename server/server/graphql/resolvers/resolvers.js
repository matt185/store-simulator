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
//* message
const messages = require('./todoResolver/messages')
const newMessage = require('./todoResolver/newMessage')
const deleteMessage = require('./todoResolver/deleteMessage')
const updateStatus = require('./todoResolver/updateStatus')

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
        //* message Query
        messages

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
        updateFavorite,
        //*message Mutation
        newMessage,
        deleteMessage,
        updateStatus
    }
}