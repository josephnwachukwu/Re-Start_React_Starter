import React, { Component } from 'react'

import './index.css'

export default class Home extends Component {

  render () {
    return (
      <div className='grid'>
        <div className='grid__col-auto hero'>
          <h1>Re-Start <span>A React Scaffold</span></h1>
          <p>
            A <strong>Mobile First</strong> responsive library of layouts and components for building outstanding Projects
          </p>
        </div>
      </div>
    )
  }
}
