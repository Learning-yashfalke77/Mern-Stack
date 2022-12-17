const express = require('express')
const catchAsync = require('../utils/catchAsync')
const validation = require('../validations/genre.validation')
const controller = require('../controllers/genre.controller')
const { auth } = require('../middlewares/auth')
const admin = require('../middlewares/admin')

const router = express.Router();

router.get("/", catchAsync(controller.all));

router.post("/", auth, validation.newGenre, catchAsync(controller.new));

router.put("/:id", validation.newGenre, catchAsync(controller.update));

router.delete("/:id", auth, admin, catchAsync(controller.delete));

router.get("/:id", catchAsync(controller.one));

module.exports = router