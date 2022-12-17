const express = require('express')
const catchAsync = require('../utils/catchAsync')
const validation = require('../validations/auth.validation')
const controller = require('../controllers/auth.controller')

const router = express.Router();

router.post('/', validation.userAuth, catchAsync(controller.login))

module.exports = router