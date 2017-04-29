import test from 'ava'
import xs from 'xstream'
import {mockTimeSource} from '@cycle/time'
import {mockDOMSource} from '@cycle/dom'
import {makeRouterDriver} from 'cyclic-router'
import {createMemoryHistory} from 'history'
import switchPath from 'switch-path'
import Router from 'components/Router'

test('only returns sinks for specified drivers', t => {
  const router = makeRouterDriver(
    createMemoryHistory(),
    switchPath
  )(xs.of('/'))

  function Home (sources) {
    return {
      DOM: xs.of('home'),
      someDriver: xs.of('some driver')
    }
  }

  const page = Router({
    router,
    routes: {'/': Home},
    driverNames: ['DOM', 'router']
  })

  t.truthy(page.DOM)
  t.falsy(page.someDriver)
})

test.cb('correct pages get called with sources', t => {
  const Time = mockTimeSource()

  const routeValues = {
    a: '/',
    b: '/other'
  }

  const expectedDOMValues = {
    a: 'home',
    b: 'home clicked',
    c: 'other',
    d: 'other clicked'
  }

/* eslint-disable no-multi-spaces */
  const route$          = Time.diagram('------b-----a', routeValues)
  const home$           = Time.diagram('---x---x-----')
  const other$          = Time.diagram('--x------x---')
  const expectedDOM$    = Time.diagram('a--b--c--d--a', expectedDOMValues)
/* eslint-enable no-multi-spaces */

  const router = makeRouterDriver(
    createMemoryHistory(),
    switchPath
  )(route$)

  function Home (sources) {
    const DOM = sources.DOM.select('.home').events('click')
      .mapTo('home clicked')
      .startWith('home')
    return {DOM}
  }

  function Other (sources) {
    const DOM = sources.DOM.select('.other').events('click')
      .mapTo('other clicked')
      .startWith('other')
    return {DOM}
  }

  const routes = {
    '/': Home,
    '/other': Other
  }

  const DOM = mockDOMSource({
    '.home': {
      'click': home$
    },
    '.other': {
      'click': other$
    }
  })

  const page = Router({
    router,
    routes,
    driverNames: ['DOM'],
    DOM
  })

  Time.assertEqual(page.DOM, expectedDOM$)
  Time.run(t.end)
})

test.cb('returns empty stream if page doesnt have sinks for a driver', t => {
  const Time = mockTimeSource()

  const routeValues = {
    a: '/',
    b: '/other'
  }

  const expectedDOMValues = {
    a: 'home',
    b: 'other'
  }

  const expectedRouterValues = {
    a: 'routes'
  }

/* eslint-disable no-multi-spaces */
  const route$          = Time.diagram('---b--a--b', routeValues)
  const expectedDOM$    = Time.diagram('a--b--a--b', expectedDOMValues)
  const expectedRouter$ = Time.diagram('a-----a---', expectedRouterValues)
/* eslint-enable no-multi-spaces */

  const router = makeRouterDriver(
    createMemoryHistory(),
    switchPath
  )(route$)

  function Home (sources) {
    return {DOM: xs.of('home'), router: xs.of('routes')}
  }

  function Other (sources) {
    return {DOM: xs.of('other')}
  }

  const routes = {
    '/': Home,
    '/other': Other
  }

  const page = Router({
    router,
    routes,
    driverNames: ['DOM', 'router']
  })

  Time.assertEqual(page.DOM, expectedDOM$)
  Time.assertEqual(page.router, expectedRouter$)
  Time.run(t.end)
})

test.cb('scopes the router to the page path', t => {
  const Time = mockTimeSource()

  const routeValues = {
    a: '/',
    b: '/other',
    c: '/other/nested'
  }

  const expectedDOMValues = {
    a: 'home',
    b: 'other',
    c: 'nested'
  }

/* eslint-disable no-multi-spaces */
  const route$          = Time.diagram('---b--c--a', routeValues)
  const expectedDOM$    = Time.diagram('a--b--c--a', expectedDOMValues)
/* eslint-enable no-multi-spaces */

  const router = makeRouterDriver(
    createMemoryHistory(),
    switchPath
  )(route$)

  function Home (sources) {
    return {DOM: xs.of('home'), router: xs.of('routes')}
  }

  function Other (sources) {
    const {router} = sources
    const routes = {
      '/': () => {
        return {DOM: xs.of('other')}
      },
      '/nested': Nested
    }

    const {DOM} = Router({
      router,
      routes,
      driverNames: ['DOM', 'router']
    })

    return {DOM}
  }

  function Nested (sources) {
    return {DOM: xs.of('nested')}
  }

  const routes = {
    '/': Home,
    '/other': Other
  }

  const page = Router({
    router,
    routes,
    driverNames: ['DOM']
  })

  Time.assertEqual(page.DOM, expectedDOM$)
  Time.run(t.end)
})
