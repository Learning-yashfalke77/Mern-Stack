const ExpressError = require("../utils/ExpressError")

module.exports = (req, res, next) => {
    if (req.user.role === 'user') throw new ExpressError('Access denied', 401)
    next()
}