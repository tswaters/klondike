'use strict'

const assert = require('assert')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
require('../api/random')(app)
app.all('*', (req, res) => res.status(404).send({status: 404}))

app.use((err, req, res, next) => {

  if (res.headersSent) { return next(err) }

  let status = 500

  if (err instanceof assert.AssertionError) {
    status = 400
  }

  res.status(status).send({error: err.message})

})

module.exports = app
