'use strict'

const path = require('path')
const feathers = require('feathers')
const configuration = require('feathers-configuration')
const hooks = require('feathers-hooks')
const socketio = require('feathers-socketio')
const rethinkdb = require('./rethinkdb')
const services = require('./services')

const app = feathers()

app
  .configure(configuration(path.join(__dirname, '..')))
  .configure(hooks())
  .configure(socketio())
  .configure(rethinkdb)
  .configure(services)

module.exports = app
