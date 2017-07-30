'use strict'

let restify = require('restify')
let restifyPlugins = require('restify-plugins')
let errors = require('restify-errors')
let _ = require('lodash')
let config = require('config')
let host = config.get('backend.host')
let port = config.get('backend.port')

let server = restify.createServer({
  name: 'cors-backend',
})

server.use(restifyPlugins.bodyParser({mapParams: false}))
server.use(restifyPlugins.queryParser({mapParams: false}))

server.post('/preflight', (req, res, next) => {
  console.log('preflight request')
  if (req.headers['content-type'] != 'application/json') {
    console.log('/preflight was requested without JSON')
    let msg = 'I decided this must be application/json, you gave ' + req.headers['content-type']
    return next(new errors.UnsupportedMediaTypeError(msg))
  }

  res.setHeader('content-type', 'application/json')
  res.send(req.body)
  return next()
})

server.post('/no-preflight', (req, res, next) => {
  if (req.headers['content-type'] == 'application/json') {
    console.log('/no-preflight was requested with JSON')
    return next(new errors.UnsupportedMediaTypeError('only preflight can use JSON'))
  }
  else if (req.headers['content-type'] != 'text/plain') {
    console.log('/no-preflight was requested without text/plain')
    let msg = 'I decided this must be text/plain, you gave ' + req.headers['content-type']
    return next(new errors.UnsupportedMediaTypeError(msg))
  }

  let response = JSON.stringify({ msg: "This is the backend response that didn't use an OPTIONS request", echo: req.body })
  res.setHeader('content-type', 'text/plain')
  res.send(response)
  return next()
})

server.listen(port, host, () => {
  console.log('%s listening at %s', server.name, server.url)
})
