const express = require('express')
const catchAsync = require('../utils/catchAsync')
const { auth } = require('../middlewares/auth')
const validation = require('../validations/movie.validation')
const controller = require('../controllers/movie.controller')

const router = express.Router();

router.get('/', controller.all)

router.get('/:id', catchAsync(controller.one))

router.post('/', auth, validation.newMovie, catchAsync(controller.new))

router.put('/:id', validation.newMovie, catchAsync(controller.update))

router.delete('/:id', catchAsync(controller.delete))

module.exports = router