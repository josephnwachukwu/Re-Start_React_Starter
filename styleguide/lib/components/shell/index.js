import React from 'react'
import { Link } from 'react-router'
import Logo from './logo.svg'

import './index.css'

function isCurrent (name) {
  let route = window.location.hash
  route = route.replace('/', '').split('#')[1]
  route = route.split('?')[0]
  return route === name ? 'current' : ''
}

const Shell = (props) => (
  <div>
    <header className="t7-header">
      <Link to="/">
        <h1 className="t7-header-h1">mWeb Styleguide</h1>
        <Logo />
      </Link>
    </header>
    <nav className="t7-nav">
      <Link to="branding" className={isCurrent('branding')}>
        Branding
      </Link>
      <Link to="components" className={isCurrent('components')}>
        Components
      </Link>
    </nav>
    <main className="t7-main">
      {props.children}
    </main>
  </div>
)

Shell.propTypes = {
  children: React.PropTypes.node
}

export default Shell
