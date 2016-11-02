import React from 'react'
import { render } from 'react-dom'
import { IndexRoute, Route, Router, hashHistory } from 'react-router'

import UnitedTheme from '../src/theme'

import Home from './lib/home'
import Branding from './lib/branding'
import Components from './lib/components'
import examplePages from './example_pages'

render(
  <UnitedTheme>
    <Router history={hashHistory}>
      <Route path="/examples">
        {
          examplePages.map(({name, ...props}, key) => (
            <Route key={key} {...props} />
          ))
        }
      </Route>
      <Route path="/">
        <IndexRoute component={Home} />
        <Route path="branding" component={Branding} />
        <Route path="components" component={Components} />
      </Route>
    </Router>
  </UnitedTheme>,
  document.querySelector('[data-root]')
)
