const _ = require('lodash')
const User = require('../models/user.model')
const ExpressError = require('../utils/ExpressError')

module.exports.new = async (req, res) => {
    const { email, username, password, role } = req.body
    let user = await User.findOne({ email })
    if (user) throw new ExpressError('User already Registered', 400)
    user = new User({ username, email, password, role })
    await user.save()
    const token = await user.generateAuthToken()
    res.status(200).json({ data: {..._.pick(user, ['_id', 'email', 'username']), token}, meta: { message: "Created User Successfully", flag: "SUCCESS", statusCode: 200 } })
}

module.exports.profile = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.status(200).json({ data: user, meta: { message: "Fetched User Successfully", flag: "SUCCESS", statusCode: 200 } })

}