const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('../api/routes')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/', routes)

module.exports = app