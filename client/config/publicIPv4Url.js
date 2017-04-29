const {networkInterfaces} = require('os')
const {both, compose, not, prop, equals, map, filter, concat, head, reduce, keys} = require('ramda')

function publicIPv4Urls (networkInterfaces) {
  return function (acc, value) {
    return concat(acc, compose(
      map(prop('address')),
      filter(both(
        compose(not, prop('internal')),
        compose(equals('IPv4'), prop('family'))
      )),
      prop(value)
    )(networkInterfaces))
  }
}

function publicIPv4Url () {
  const ni = networkInterfaces()
  return compose(
    head,
    reduce(publicIPv4Urls(ni), []),
    keys
  )(ni)
}

module.exports = publicIPv4Url
