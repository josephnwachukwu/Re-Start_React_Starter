import React from 'react'
import ReactDOM from 'react-dom'
import { Route, IndexRoute, Router, hashHistory } from 'react-router'

import './index.css'

import Theme from './theme'
import MainLayout from './app/MainLayout'
import Dashboard from './app/Dashboard'
import ClaimsList from './app/ClaimsList'
import CreateOrder from './app/CreateOrder'
import ProductPage from './app/CreateOrder/ProductPage'
import PatientInfo from './app/PatientInfo'
import NotFound from './app/NotFound'
import Sandbox from './app/Sandbox'

import loadScript from './app/Shared/Utils/loadScript'
import googleMapsApi from './app/Shared/Utils/googleMapsApi'

function launchApp () {
  ReactDOM.render(
    <Theme>
      <Router history={hashHistory}>
        <Route path='/' component={MainLayout}>
          <IndexRoute component={Dashboard} />
          <Route path='activeclaims' component={ClaimsList} />
          <Route path='dashboard' component={Dashboard} />
          <Route path='patientinfo' component={PatientInfo} />
          <Route path='sandbox' component={Sandbox} />
          <Route path='createorder' component={CreateOrder}>
            <Route path='product' component={ProductPage} />
          </Route>
        </Route>
        <Route path='*' component={NotFound} />
      </Router>
    </Theme>,
    document.querySelector('#app-root')
  )
}

function boot () {
  googleMapsApi.getApiKey().then(payload => {
    const { apiKey } = payload

    window.bootStage2 = () => {
      window.bootStage2 = null
      launchApp()
    }

    const url = googleMapsApi.getUrl({
      apiKey,
      libraries: ['places']
    }, 'bootStage2')

    loadScript(url)
  })
}

boot()
