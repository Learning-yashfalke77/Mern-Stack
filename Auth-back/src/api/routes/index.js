const express = require('express')
const userRoutes = require('./user.route')
const authRoutes = require('./auth.route')
const genreRoutes = require('./genre.route')
const movieRoutes = require('./movie.routes')

const router = express.Router();

// health Check
router.get('/status', (req, res) => (res.status(200).json({ data: {}, meta: { message: "Welcome to auth", flag: "SUCCESS", statusCode: 200 } })))

router.use('/user', userRoutes)
router.use('/auth', authRoutes)
router.use('/genre', genreRoutes)
router.use('/movie', movieRoutes)

module.exports = router