import React, { Component, PropTypes } from 'react'

import Header from './Header'
import Footer from './Footer'
import SideBar from './SideBar'

class MainLayout extends Component {
  render () {
    function onClick () {
      alert('Dropdown Item Clicked')
    }

    const dropdown = [
      {key: 0, name: 'Profile', onClick},
      {key: 1, name: 'Logout', onClick}
    ]

    return (
      <div className='grid'>
        <div className='grid__col-12 grid__cell'>
          <Header
            name='Erica'
            fields={dropdown}
          />
        </div>
        <div>
          <SideBar location={this.props.location} />
        </div>
        <div className='main-content grid__col-lg-auto grid__col-md-auto'>
          {this.props.children}
        </div>
        <div className='grid__col-12'>
          <Footer />
        </div>
      </div>
    )
  }
}

MainLayout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object
}

export default MainLayout
