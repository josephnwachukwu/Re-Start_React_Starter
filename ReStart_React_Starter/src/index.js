import React from 'react'
import ReactDOM from 'react-dom'
import { Route, IndexRoute, Router, hashHistory } from 'react-router'

import './index.css'

import Theme from './theme'
import MainLayout from './app/MainLayout'
import Dashboard from './app/Dashboard'
import Home from './app/Home'
import NotFound from './app/NotFound'

function launchApp () {
  ReactDOM.render(
    <div>
      <Theme>
        <Router history={hashHistory}>
          <Route path='/' component={MainLayout}>
            <IndexRoute component={Home} />
            <Route path='home' component={Home} />
            <Route path='dashboard' component={Dashboard} />
          </Route>
          <Route path='*' component={NotFound} />
        </Router>
      </Theme>
    </div>,
    document.querySelector('#app-root')
  )
}

launchApp()

function boot () {
}

boot()
