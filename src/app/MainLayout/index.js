import React, { Component, PropTypes } from 'react'

import Header from './Header'
import Footer from './Footer'
import SideBar from './SideBar'

import './index.css'

export default class MainLayout extends Component {
  render () {
    const dropdown = [
      {key: 0, name: 'Profile', url: 'profile'},
      {key: 1, name: 'Logout', url: 'logout'}
    ]

    return (
      <div className='main-layout-container'>
        <Header
          name='Erica'
          fields={dropdown}
        />
        <div className='sidebar-and-content-container'>
          <SideBar location={this.props.location} />
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
