const Genre = require('../models/genre.model');
const ExpressError = require('../utils/ExpressError');
module.exports.all = async (req, res) => {
    const genres = await Genre.find().select("-__v").sort("name");
    res.status(200).json({ data: genres, meta: { message: "Fetched All Genre Successfully", flag: "SUCCESS", statusCode: 200 } })
}

module.exports.new = async (req, res) => {
    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.status(200).json({ data: genre, meta: { message: "Created new Genre Successfully", flag: "SUCCESS", statusCode: 200 } })
}

module.exports.one = async (req, res) => {
    const genre = await Genre.findById(req.params.id).select("-__v");
    if (!genre) throw new ExpressError("The genre with the given ID was not found.", 404);
    res.status(200).json({ data: genre, meta: { message: "Fetched Genre Successfully", flag: "SUCCESS", statusCode: 200 } })
}

module.exports.update = async (req, res) => {
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true, runValidators: true });
    if (!genre) throw new ExpressError("The genre with the given ID was not found.", 404);
    res.status(200).json({ data: genre, meta: { message: "Updated Genre Successfully", flag: "SUCCESS", statusCode: 200 } })
}

module.exports.delete = async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) throw new ExpressError("The genre with the given ID was not found.", 404);
    res.status(200).json({ data: genre, meta: { message: "Deleted Genre Successfully", flag: "SUCCESS", statusCode: 200 } })
}