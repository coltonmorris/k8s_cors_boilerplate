'use strict'

let restify = require('restify')
let restifyPlugins = require('restify-plugins')
let errors = require('restify-errors')
let config = require('config')
let host = config.get('frontend.host')
let port = config.get('frontend.port')

let server = restify.createServer({
  name: 'cors-frontend',
})

server.use(restifyPlugins.bodyParser({mapParams: false}))
server.use(restifyPlugins.queryParser({mapParams: false}))

server.post('/', (req, res, next) => {
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

server.listen(port, host, () => {
  console.log('%s listening at %s', server.name, server.url)
})
