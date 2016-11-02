import React from 'react'
import { render } from 'react-dom'
import { Route, IndexRoute, Router, hashHistory } from 'react-router'
import Theme from './theme'

import AppShell from './components/app_shel'

import Example from './app/example'
import Home from './app/home'
import NotFound from './app/not_found'

render(
  <Theme>
    <Router history={hashHistory}>
      <Route path='/' component={AppShell}>
        <IndexRoute component={Home} />
        <Route path='example' component={Example} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Theme>,
  document.querySelector('[data-root]')
)
