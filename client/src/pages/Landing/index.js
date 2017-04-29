import xs from 'xstream'
import {h1} from '@cycle/dom'

export default function Landing (sources) {
  return {
    DOM: xs.of(h1('.title', 'Amblin'))
  }
}
