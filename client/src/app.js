'use strict'

import {run} from '@cycle/run'
import main from './main'
import drivers from './drivers'
require('styles/main.css')

NODE_ENV !== 'dev' && require('offline-plugin/runtime').install() // eslint-disable-line no-undef

run(main, drivers)
