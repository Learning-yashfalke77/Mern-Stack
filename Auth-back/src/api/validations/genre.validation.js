const Joi = require('joi');
const ExpressError = require('../utils/ExpressError')


const genreSchema = Joi.object({
    name: Joi.string().min(5).max(50).required()
})

module.exports.newGenre = (req, res, next) => {
    const { error } = genreSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}
