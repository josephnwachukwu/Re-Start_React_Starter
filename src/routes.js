import React from 'react'
import {
  Route,
  IndexRoute,
  Router,
  hashHistory
} from 'react-router'
import Home from './app/home'

export default (
  <Router history={hashHistory}>
    <Route path='/'>
      <IndexRoute component={Home} />
      <Route path='home' component={Home} />
    </Route>
  </Router>
)
