import React from 'react'

import DatePicker from '../Shared/DatePicker'

import $ from 'jquery'
window.jQuery = $
require('ms-signalr-client')

import './index.css'

var connection = $.hubConnection('https://polarisgatewayapi.azurewebsites.net/signalr')
var proxy = connection.createHubProxy('gatewayHub')

// receives broadcast messages from a hub function, called "broadcastMessage"
proxy.on('broadcastMessage', function (message) {
  console.log(message)
})

// atempt connection, and handle errors
connection.start({ jsonp: true })
   .done(function () { console.log('Now connected, connection ID=' + connection.id) })
   .fail(function () { console.log('Could not connect') })

const Sandbox = props => {
  return (
    <div className='sandbox'>
      <p>
        SandBox Page
      </p>

      <DatePicker />

    </div>
  )
}

Sandbox.propTypes = {
}

export default Sandbox
