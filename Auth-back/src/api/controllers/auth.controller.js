const _ = require('lodash')
const User = require('../models/user.model')
const ExpressError = require('../utils/ExpressError')

module.exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findAndValidate(email, password)
    if (!user) throw new ExpressError('Invalid credentials', 400)
    const token = await user.generateAuthToken();
    res.status(200).json({ data: { token }, meta: { message: "User Authenticated Successfully", flag: "SUCCESS", statusCode: 200 } })
}