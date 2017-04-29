import test from 'ava'
import xs from 'xstream'
import {makeRouterDriver} from 'cyclic-router'
import {createMemoryHistory} from 'history'
import switchPath from 'switch-path'
import {mockTimeSource} from '@cycle/time'
import {select} from 'snabbdom-selector'
import {curry, compose, head, prop} from 'ramda'
import main from './main'

test.cb('displays app name', t => {
  const Time = mockTimeSource()

  const router = makeRouterDriver(
    createMemoryHistory(),
    switchPath
  )(xs.of('/'))

  const titleText = compose(
    prop('text'),
    head,
    curry(select)('.title')
  )

  const title$ = main({router}).DOM.map(titleText)
  const expectedTitle$ = Time.diagram(`a`, {a: 'Amblin'})

  Time.assertEqual(title$, expectedTitle$)
  Time.run(t.end)
})
