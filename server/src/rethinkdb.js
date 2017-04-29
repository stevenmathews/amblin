const rethinkdbdash = require('rethinkdbdash')

module.exports = function () {
  const app = this
  app.set('rethinkdbClient', rethinkdbdash(app.get('rethinkdb')))
}
