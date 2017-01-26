var fs = require('fs')
var ipfsh = require('../ipfshelper')

var routes = [
  {
    method: 'GET',
    path: '/asset',
    handler: function (request, reply) {
      var ipfsReply = ipfsh.pinToIpfs('uploads/Screen Shot 2017-01-10 at 9.24.12 AM.png')
      reply(JSON.stringify(ipfsReply))
    }
  },
  {
    method: 'POST',
    path: '/asset/upload',
    config: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data'
      },
      handler: function (request, reply) {
        console.log('here')
        var data = request.payload
        if (data.file) {
          var name = data.file.hapi.filename
          var path = process.cwd() + '/uploads/' + name
          var file = fs.createWriteStream(path)

          file.on('error', function (err) {
            console.error(err)
          })

          data.file.pipe(file)

          data.file.on('end', function (err) {
            if (err) {
              throw err
            }
            var ret = {
              filename: data.file.hapi.filename,
              headers: data.file.hapi.headers
            }
            reply(JSON.stringify(ret))
          })
        }
      }
    }
  }
]

exports.routes = function (server) {
  server.route(routes)
}
