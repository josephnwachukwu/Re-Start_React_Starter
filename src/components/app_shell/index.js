import React, { PropTypes } from 'react'
import './index.css'

const AppShell = ({children}) => (
  <div>
    {children}
  </div>
)

AppShell.propTypes = {
  children: PropTypes.node
}

export default AppShell
