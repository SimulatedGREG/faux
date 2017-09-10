const pluralize = require('pluralize')

class Server {
  constructor (opts, models) {
    this.opts = opts
    this.models = models
    this._server = require('fastify')()

    this._attachModels()
  }

  listen () {
    this._server.listen(this.opts.port = 8080)
  }

  _attachModels () {
    Object.keys(this.models).forEach(model => {
      const generate = this.models[model]

      this._server.get(
        `/${model}`,
        (req, rep) => {
          rep.send(generate())
        }
      )

      this._server.get(
        `/${pluralize(model)}`,
        {
          schema: {
            querystring: {
              limit: { type: 'number' }
            }
          }
        },
        (req, rep) => {
          let limit = req.query.limit || 5
          let chain = []

          for (let i = 0; i < limit; i++) chain.push(generate())

          Promise.all(chain).then(payload => {
            rep.send(payload)
          })
        }
      )
    })
  }
}

module.exports = Server
