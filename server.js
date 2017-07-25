'use strict'

let restify = require('restify')
let restifyPlugins = require('restify-plugins')

let server = restify.createServer({
  name: 'test-server',
})

server.use(restifyPlugins.bodyParser({mapParams: true}))
server.use(restifyPlugins.queryParser({mapParams: true}))

server.post('/image', (req, res, next) => {
  console.log('request just came in')

  console.log('req: ', Object.keys(req))
  console.log('params: ', typeof req.params)
  console.log('params keys: ',  Object.keys(req.params))

  console.log('URL: ', req.params.url)
  // console.log('keys: ', Object.keys(req))
  // console.log('json: ', JSON.parse(req.body))

  res.send({msg: "worked mother fucker"})
  return next()
})

server.get('/hello/:name', (req, res, next) => {
  console.log('in get method')
  console.log(Object.keys(req.params))
  console.log('req.query', req.params.name)
  res.send('hello ')
  return next()
})


server.listen(80);
