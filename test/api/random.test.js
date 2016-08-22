'use strict'

const assert = require('assert')
const base = require('../helper')
const async = require('async')

describe('random web service', () => {

  let agent = null
  const uri = '/random'

  before(() => base.listen().then(_agent => agent = _agent))

  after(() => base.close())

  it('should return a value within range', (done) => {

    const min = 5452
    const max = 341244939
    const iterations = 10

    async.times(iterations, (i, next) => {
      agent.post(uri).send({min, max}).expect(200).end((err, res) => {
        if (err) { return next(err) }
        const result = res.body.number
        assert(!isNaN(result))
        assert(result >= min)
        assert(result <= max)
        next()
      })
    }, done)

  })

  it('should blow up when not providing min', (done) => {
    agent.post(uri).send(null).expect(400, {error: 'min must be a number'}).end(done)
  })

  it('should blow up when not providing max', (done) => {
    agent.post(uri).send({min: 0}).expect(400, {error: 'max must be a number'}).end(done)
  })

  it('should blow up when max > max safe integer', (done) => {
    agent.post(uri).send({min: 0, max: Number.MAX_SAFE_INTEGER + 1}).expect(400, {error: 'max must be a safe integer'}).end(done)
  })

  it('should blow up when min > max', (done) => {
    agent.post(uri).send({min: 0, max: -1}).expect(400, {error: 'min must be less than or equal to max'}).end(done)
  })

  it('should blow up when range > 6 bytes', (done) => {
    agent.post(uri).send({min: 0, max: Math.pow(256, 6) - 1}).expect(400, {error: 'cant calculate when range >= 6 bytes'}).end(done)
  })

  it('should be ok with 0-0', (done) => {
    agent.post(uri).send({min: 0, max: 0}).expect(200, {number: 0}).end(done)
  })

})
