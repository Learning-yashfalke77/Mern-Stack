const Joi = require('joi');
// joi password complexity for good password checking
const ExpressError = require('../utils/ExpressError')

const userRegisterSchema = Joi.object({
    username: Joi.string().required().alphanum().min(5).max(50),
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(255),
    role: Joi.string().valid('user', 'admin'),
})

module.exports.userRegister = (req, res, next) => {
    const { error } = userRegisterSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}
