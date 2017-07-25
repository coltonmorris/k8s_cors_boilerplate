'use strict'

let rp = require('request-promise')


let options = {
  method: 'POST',
  uri: 'http://test-server/image',
  json: true,
  body: {
    url: "testing url"
  }
}

let getOptions = {
  method: 'GET',
  uri: 'http://test-server/hello/?name=colton'
}

rp(options)
.then((res) => {
  console.log('response here')
  // console.log('body: ', res.body)
  console.log(Object.keys(res))
  console.log('res type: ', typeof res)
  console.log('res: ', res.msg)
})
.catch((err) => {
  console.log('error: ', err)
})
.then(() => {
  console.log('now trying get')
  return rp(getOptions)
  .then((res) => {
    console.log('got it')
    console.log('get response: ', res)
  })
  .catch((err) => {
    console.log('get error: ', err)
  })
})
.then(() => {
  while(true) {
  }
})
