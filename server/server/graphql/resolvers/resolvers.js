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
const todos = require('./todoResolver/todos')
const newTodo = require('./todoResolver/newTodo')
const deleteTodo = require('./todoResolver/deleteTodo')
const updateTodoStatus = require('./todoResolver/updateTodoStatus')
const deleteCompleteTodos = require('./todoResolver/deleteCompleteTodos')
//*shopping bag
const addToBag = require('./shoppingBagResolver/addToBag')
const bags = require('./shoppingBagResolver/bags')
const removeFromBag = require('./shoppingBagResolver/removeFromBag')
const removeAllFromBag = require('./shoppingBagResolver/removeAllFromBag')
//* order resolver
const orders = require('./orderResolver/orders')
const newOrder = require('./orderResolver/newOrder')
const deleteOrder = require('./orderResolver/deleteOrder')
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
        todos,
        //* shoppingBag Query
        bags,
        //*order Query
        orders,
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
        newTodo,
        deleteTodo,
        updateTodoStatus,
        deleteCompleteTodos,
        //*shoppingBag Mutation
        addToBag,
        removeFromBag,
        removeAllFromBag,
        //*order Mutation
        newOrder,
        deleteOrder
    }
}