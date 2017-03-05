import React, {PropTypes} from 'react'

import './index.css'

const ErrorMessage = props => {
  if (props.showError) {
    return (
      <div className='error-message error-message__main-container'>
        {props.message ? props.message : props.children}
      </div>
    )
  } else {
    return (
      <div className='error-message__main-container error-message__no-error' />
    )
  }
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
  children: PropTypes.node,
  showError: PropTypes.bool.isRequired
}

export default ErrorMessage
