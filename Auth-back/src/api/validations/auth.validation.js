const Joi = require('joi');
const ExpressError = require('../utils/ExpressError')

const userAuthSchema = Joi.object({
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(255)
})

module.exports.userAuth = (req, res, next) => {
    const { error } = userAuthSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}
