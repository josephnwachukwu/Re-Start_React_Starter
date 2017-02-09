import React, { Component } from 'react'

import TypeAhead from '../Shared/TypeAhead'

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
        <TypeAhead
          label='Type Ahead'
          placeholder='Placeholder'
          minNumCharacters={3}
          onChange={(v) => { console.log(v) }}
          fieldName='Procedure'
        />

      </div>
    )
  }
}

