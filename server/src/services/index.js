'use strict'

const users = require('./users/users.service')

module.exports = function () {
  const app = this
  app.configure(users)
}
