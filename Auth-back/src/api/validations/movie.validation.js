const Joi = require('joi');
const ExpressError = require('../utils/ExpressError')

const newMovieSchema = Joi.object({
    title: Joi.string().required().min(5).max(255),
    genre: Joi.string().required(),
    numberInStock: Joi.number().required().min(0).max(255),
    dailyRentalRate: Joi.number().required().min(0).max(255),
})

module.exports.newMovie = (req, res, next) => {
    const { error } = newMovieSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(', ')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}
