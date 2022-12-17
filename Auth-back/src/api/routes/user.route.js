const express = require('express')
const catchAsync = require('../utils/catchAsync')
const validation = require('../validations/user.validation')
const controller = require('../controllers/user.controller')
const { auth } = require('../middlewares/auth')

const router = express.Router();

router.get('/me', auth, catchAsync(controller.profile))

router.post('/', validation.userRegister, catchAsync(controller.new))

module.exports = router