'use strict'

const Hapi = require('hapi')
var _ = require('lodash')
require('locus')
var ipfsAPI = require('ipfs-api')
var ipfs = ipfsAPI({host: '192.168.27.101', port: '5001', protocol: 'http'})

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
  server.start((err) => {
    if (err) {
      throw err
    }
    console.log('Server running at:', server.info.uri)
  })
})
