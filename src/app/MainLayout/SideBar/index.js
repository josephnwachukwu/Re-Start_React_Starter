import React from 'react'
import { Link } from 'react-router'

import './index.css'

const SideBar = props => {
  return (
    <div className='sidebar'>
      <ul className='sidebar__menu'>
        <li><img src='' /> <Link to='dashboard'>Dashboard</Link></li>
        <li><img src='' /> <Link to='activeclaims'>Active Claims</Link> <span className='badge'>278</span></li>
        <li><img src='' /> <a href=''>Create Order</a></li>
        <li><img src='' /> <a href=''>Quote</a></li>
        <li><img src='' /> <a href=''>Contact Onecall</a></li>
      </ul>
    </div>
  )
}

SideBar.propTypes = {
}

export default SideBar
