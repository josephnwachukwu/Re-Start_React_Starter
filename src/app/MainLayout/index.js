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
        <div className='grid__col-1'>
          <SideBar />
        </div>
        <div className='main-content grid__col-11'>
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
  children: PropTypes.node
}

export default MainLayout
