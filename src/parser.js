const requireDir = require('require-dir')
const faker = require('faker')
const get = require('lodash.get')

class Parser {
  constructor (opts) {
    this.opts = opts
    this.models = {}
  }

  generate () {
    const schemas = requireDir(this.opts.modelsDirectory)

    Object.keys(schemas).forEach(model => {
      Object.keys(schemas[model]).forEach(property => {
        schemas[model][property] = get(faker, schemas[model][property])
      })

      this.models[model] = this._createModel(schemas[model])
    })

    return this.models
  }

  _createModel (model) {
    return function () {
      return new Promise((resolve, reject) => {
        let output = {}

        Object.keys(model).forEach(key => {
          output[key] = model[key]()
        })

        resolve(output)
      })
    }
  }
}

module.exports = Parser
