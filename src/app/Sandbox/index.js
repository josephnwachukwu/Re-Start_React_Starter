import React, { Component } from 'react'

import DatePicker from '../Shared/DatePicker'
import TypeAhead from '../Shared/Fields/TypeAhead'
import MultiLineText from '../Shared/Fields/MultiLineText'

import $ from 'jquery'
window.jQuery = $
require('ms-signalr-client')

import './index.css'

export default class Sandbox extends Component {
  render () {
    const connection = $.hubConnection('https://polarisgatewayapi.azurewebsites.net/signalr')
    const proxy = connection.createHubProxy('gatewayHub')

    // receives broadcast messages from a hub function, called "broadcastMessage"
    proxy.on('broadcastMessage', function (message) {
      console.log(message)
    })

    // atempt connection, and handle errors
    connection.start({
      jsonp: false,
      withCredentials: false
    })
      .done(function () { console.log('Now connected, connection ID=' + connection.id) })
      .fail(function () { console.log('Could not connect') })

    return (
      <div className='sandbox'>
        <p>
        SandBox Page
        </p>

        <DatePicker
          label='Date From Form Generator with error'
          status='error'
          onChange={(v) => { console.log(v) }}
          errorMessage='- sample error message'
        />

        <DatePicker
          label='Date From Form Generator with time'
          enableTime
          selection='1985-01-11'
          onChange={(v) => { console.log(v) }}
        />

        <DatePicker
          label='Date From Form Generator default date and error'
          selection='1985-01-11'
          status='error'
          onChange={(v) => { console.log(v) }}
          errorMessage='- sample error message'
        />

        <TypeAhead
          label='Type Ahead'
          placeholder='Placeholder'
          minNumCharacters={3}
          onChange={(v) => { console.log(v) }}
          fieldName='Procedure'
          status='error'
        />

        <MultiLineText
          label='Multi Line Text'
          selection=''
          onChange={(v) => { console.log(v) }}
        />

        <MultiLineText
          label='Multi Line Text with error'
          status='error'
          errorMessage='- sample error message'
          selection=''
          onChange={(v) => { console.log(v) }}
        />

      </div>
    )
  }
}
