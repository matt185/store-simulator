module.exports = (_, __, {
    req
}) => {
    req.session.userId = ""
    return true
}