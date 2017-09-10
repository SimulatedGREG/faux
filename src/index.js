const Parser = require('./parser')
const Server = require('./server')

module.exports = (opts = {}) => {
  const parser = new Parser(opts)
  const models = parser.generate()

  const server = new Server(opts, models)
  server.listen()
}
