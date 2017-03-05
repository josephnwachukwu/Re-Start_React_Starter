import React, { Component, PropTypes } from 'react'

import Header from './Header'
import Footer from './Footer'

import './index.css'

export default class MainLayout extends Component {
  render () {
    return (
      <div className='main-layout-container'>
        <Header />
        <div className='sidebar-and-content-container'>
          <div className='main-content-container'>
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

MainLayout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object
}
