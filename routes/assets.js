var routes = [
  {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      return reply('Hello world')
    }
  }
]

exports.routes = function (server) {
  server.route(routes)
}
