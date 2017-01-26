import React from 'react'
import ReactDOM from 'react-dom'
import { Route, IndexRoute, Router, hashHistory } from 'react-router'

import './index.css'

import Theme from './theme'
import MainLayout from './app/MainLayout'
import Dashboard from './app/Dashboard'
import ClaimsList from './app/ClaimsList'
import PatientInfo from './app/PatientInfo'
import NotFound from './app/NotFound'
import Sandbox from './app/Sandbox'

ReactDOM.render(
  <Theme>
    <Router history={hashHistory}>
      <Route path='/' component={MainLayout}>
        <IndexRoute component={Dashboard} />
        <Route path='activeclaims' component={ClaimsList} />
        <Route path='dashboard' component={Dashboard} />
        <Route path='patientinfo' component={PatientInfo} />
        <Route path='sandbox' component={Sandbox} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Theme>,
  document.querySelector('#app-root')
)
