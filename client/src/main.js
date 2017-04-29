import Router from './components/Router'
import {routes} from './routes'
import {DRIVER_NAMES} from './constants'

export default function main (sources) {
  const {DOM} = Router({
    routes,
    driverNames: DRIVER_NAMES,
    ...sources
  })

  return {DOM}
}
