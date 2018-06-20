const StaticServer = require('static-server')
const log = require('./logger')
const path = require('path')
const rootPath = path.join(__dirname, 'dist')

module.exports = function () {
  this.listen = function (port) {
    var server = new StaticServer({
      rootPath: rootPath,
      port: port,
      name: 'md-web-client',
      templates: {
        index: 'index.html', // optional, defaults to 'index.html'
        notFound: './dist/404.html' // optional, defaults to undefined
      }
    })

    server.start(() => {
      log.info(`md-web-client server listening on *:${server.port}`)
    })
    server.on('response', function (req, res) {
      if (res.statusCode !== 200) {
        log.warn('md-web-client', req.method, req.path, req.elapsedTime, res.statusCode)
      } else {
        log.silly('md-web-client', req.method, req.path, req.elapsedTime, res.statusCode)
      }
    })
  }
}
