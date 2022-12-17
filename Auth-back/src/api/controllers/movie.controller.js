const Movie = require('../models/movie.model')
const Genre = require('../models/genre.model')
const ExpressError = require('../utils/ExpressError')


module.exports.all = async (req, res) => {
    const movies = await Movie.find().populate('genre').select("-__v").sort("genre.name")
    res.status(200).json({ data: movies, meta: { message: "Fetched All Movies Successfully", flag: "SUCCESS", statusCode: 200 } })

}

module.exports.one = async (req, res) => {
    const movie = await Movie.findById(req.params.id).populate('genre')
    if (!movie) throw new ExpressError('Movie does not exist', 400)
    res.status(200).json({ data: movie, meta: { message: "Fetched Movie Successfully", flag: "SUCCESS", statusCode: 200 } })
}

module.exports.new = async (req, res) => {
    const { title, genre, numberInStock, dailyRentalRate } = req.body
    const genres = await Genre.findById(genre)
    if (!genres) throw new ExpressError('Genre does not exist', 400)
    const movie = new Movie({ title, genre, numberInStock, dailyRentalRate })
    await movie.save()
    res.status(200).json({ data: movie, meta: { message: "Created Movie Successfully", flag: "SUCCESS", statusCode: 200 } })
}

module.exports.update = async (req, res) => {
    const { title, genre, numberInStock, dailyRentalRate } = req.body
    const genres = await Genre.findById(genre)
    if (!genres) throw new ExpressError('Genre does not exist', 400)
    const movie = await Movie.findByIdAndUpdate(req.params.id, { title, genre, numberInStock, dailyRentalRate }, { new: true, runValidators: true })
    if (!movie) throw new ExpressError('movie does not exist', 404)
    res.status(200).json({ data: movie, meta: { message: "Updated Movie Successfully", flag: "SUCCESS", statusCode: 200 } })
}

module.exports.delete = async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie) throw new ExpressError('Movie does not exists', 400)
    res.status(200).json({ data: movie, meta: { message: "Deleted Movie Successfully", flag: "SUCCESS", statusCode: 200 } })
}