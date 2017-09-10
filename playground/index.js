const path = require('path')

require('../src/index')({
  modelsDirectory: path.join(__dirname, '/faux')
})
