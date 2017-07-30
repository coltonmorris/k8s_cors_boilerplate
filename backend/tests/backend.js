'use strict'

let mocha = require('mocha')
let chai = require('chai')
let rp = require('request-promise')
let _ = require('lodash')
let expect = chai.expect
let config = require('config')
let host = 'http://' + config.get('backend.host') + ':' + config.get('backend.port')

describe('Backend Server', function() {
  describe('/preflight', function() {
    let options
    let body
    beforeEach(function() {
      options = {
        uri: host + '/preflight',
        method: 'POST',
        json: true,
        headers: {
          'content-type': 'application/json'
        },
      }
    })

    it('should fail to send a NON JSON request', function() {
      options.headers = {
          'content-type': 'text/plain'
      }
      options.json = false
      options = _.merge(options, {
        body: "this should fail"
      })
      return rp(options).catch((err) => {
        expect(err.statusCode).to.equal(415)
      })
    })

    it('should hit /preflight and get JSON back', function () {
      options = _.merge(options, {
        body: {}
      })
      return rp(options).then((res) => {
        expect(res).to.be.an('object')
      })
    })

    it('should hit /preflight and get an echo response', function () {
      body = { echo: "You\'re an idiot" }
      options = _.merge(options, {
        body: body
      })
      return rp(options).then((res) => {
        expect(res).to.deep.equal(body)
      })
    })
  })

  describe('/no-preflight', function() {
    let options
    let message
    beforeEach(function() {
      options = {
        uri: host + '/no-preflight',
        method: 'POST',
        headers: {
          'content-type': 'text/plain'
        },
      }
    })

    it('should fail to send a JSON request', function() {
      options.headers = {
          'content-type': 'application/json'
      }
      options = _.merge(options, {
        resolveWithFullResponse: true,
        json: true,
        body: {
          echo: 'this should fail'
        }
      })
      return rp(options).catch((err) => {
        expect(err.statusCode).to.equal(415)
      })
    })

    it('should hit /no-preflight and get a String back', function () {
      options = _.merge(options, {
        body: "empty"
      })
      return rp(options).then((res) => {
        expect(res).to.be.a('string')
      })
    })

    it('should hit /no-preflight and get an echo response', function () {
      message = JSON.stringify({ message: 'hi there'})
      options = _.merge(options, {
        body: message
      })
      return rp(options).then((res) => {
        expect(JSON.parse(res).echo).to.equal(message)
      })
    })
  })
})
