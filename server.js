'use strict'
const Hapi = require('hapi')
var _ = require('lodash')
require('locus')
// eval(locus)

var server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8000
})

server.register({
  register: require('hapi-routes'),
  options: {dir: 'routes'}
}, function (err) {
  if (err) {
    throw err
  }
  server.start((err) => {
    if (err) {
      throw err
    }
    console.log('Server running at:', server.info.uri)
  })
})
