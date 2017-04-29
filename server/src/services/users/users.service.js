'use strict'

const createService = require('feathers-rethinkdb')
const hooks = require('./users.hooks')
const filters = require('./users.filters')

module.exports = function () {
  const app = this

  app.use('/users', createService({
    name: 'users',
    Model: app.get('rethinkdbClient'),
    paginate: app.get('paginate')
  }))

  app.service('users')
    .hooks(hooks)
    .filter(filters)
}
