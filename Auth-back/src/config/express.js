const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { logs } = require('./vars')
const routes = require('../api/routes/index')


const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(morgan(logs))

app.use(cors())

app.use('/api', routes)



module.exports = app