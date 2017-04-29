'use strict'

const app = require('./app')
const port = app.get('port')
const server = app.listen(port)

process.on('unhandledRejection', (reason) =>
  console.log('Unhandled Rejection: ', reason)
)

server.on('listening', () =>
  console.log(`Server started on ${app.get('host')}:${port}`)
)
