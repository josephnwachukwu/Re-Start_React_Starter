import React, { PropTypes } from 'react'
import './index.css'

const Button = ({ className, children, ...props }) => {
  return (
    <button {...props}
      className={`ua-button${className ? ` ${className}` : ''}`}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default Button
