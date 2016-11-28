import React from 'react'
import ReactDOM from 'react-dom'
import { Route, IndexRoute, Router, hashHistory } from 'react-router'

import Theme from './theme'
import MainLayout from './app/MainLayout'
import Dashboard from './app/Dashboard'
import ClaimsList from './app/ClaimsList'
import NotFound from './app/NotFound'

ReactDOM.render(
  <Theme>
    <Router history={hashHistory}>
      <Route path='/' component={MainLayout}>
        <IndexRoute component={ClaimsList} />
        <Route path='dashboard' component={Dashboard} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Theme>,
  document.querySelector('#app-root')
)
