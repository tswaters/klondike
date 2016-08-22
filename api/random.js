'use strict'

const assert = require('assert')
const crypto = require('crypto')

module.exports = (app) => {

  app.post('/random', (req, res) => {

    // borrowed from http://stackoverflow.com/a/33627342

    // figure out range and how many bytes required
    const min = parseInt(req.body.min, 10)
    const max = parseInt(req.body.max, 10)
    const range = max - min
    const numBits = Math.log(range) / Math.log(2)
    const numBytes = Math.floor(numBits / 8) + 1
    const maxRange = Math.pow(256, numBytes)

    // if min === max, don't proceed, just return the value
    // numBits is -Infinity and crypto doesn't like it.
    if (range === 0) {
      return done(min)
    }

    // perform some sanity checks on the inputs
    assert(typeof min === 'number' && !isNaN(min), 'min must be a number')
    assert(typeof max === 'number' && !isNaN(max), 'max must be a number')
    assert(min <= max, 'min must be less than or equal to max')
    assert(Number.isSafeInteger(max), 'max must be a safe integer')
    assert(numBytes < 6, 'cant calculate when range >= 6 bytes')

    // calculate the random bytes, turn into integer
    const bytes = crypto.randomBytes(numBytes)
    const num = parseInt(bytes.toString('hex'), 16)
    done(Math.floor(num / maxRange * (range + 1) + min))

    function done (number) {
      res.status(200).send({number})
    }

  })

}
