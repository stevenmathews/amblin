import xs from 'xstream'
import {propOr} from 'ramda'

function callComponent (sources) {
  return function ({path, value}) {
    return value({...sources, router: sources.router.path(path)})
  }
}

function switchSinks (driverNames, sinks$) {
  return driverNames.reduce((acc, driverName) => {
    acc[driverName] = sinks$
      .map(propOr(xs.never(), driverName))
      .flatten()

    return acc
  }, {})
}

export default function Router (sources) {
  const {router, routes, driverNames} = sources

  const sinks$ = router
    .define(routes)
    .map(callComponent(sources))

  return switchSinks(driverNames, sinks$)
}
