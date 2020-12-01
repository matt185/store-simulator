const {
    Item
} = require('./../../../../database/models')

module.exports = async () => {
    const items = await Item.findAll({
        order: ["id"]
    })


    return items
}