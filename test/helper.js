'use strict'

const supertest = require('supertest')
const agent = supertest.agent
const app = require('../app/app')

let server = null

module.exports.listen = () => {
  return new Promise((resolve) => {
    server = app.listen(1336, () => {
      resolve(agent(app))
    })
  })
}

module.exports.close = () => {
  server.close()
}
