import {makeDOMDriver} from '@cycle/dom'
import {makeRouterDriver} from 'cyclic-router'
import {createBrowserHistory} from 'history'
import switchPath from 'switch-path'

export default {
  DOM: makeDOMDriver('#app'),
  router: makeRouterDriver(createBrowserHistory(), switchPath)
}
