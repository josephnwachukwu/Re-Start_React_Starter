import React, { Component, PropTypes } from 'react'

import './index.css'

export default class Button extends Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)

    this.state = {
      value: '',
      classes: [ 'pristine', 'valid' ]
    }
  }

  onClick (event) {
    this.setState({
      value: event.target.value
    }, () => {
      this.props.onClick(this.state.value)
    })
  }

  onFocus (event) {
    this.setState({
      classes: ['touched']
    })
  }

  render () {
    const label = this.props.label

    let btnClass = ''

    switch (this.props.type) {
      case 'success': {
        btnClass = 'btn__success'
        break
      }
      case 'neutral': {
        btnClass = 'btn__neutral'
        break
      }
      case 'delete': {
        btnClass = 'btn__delete'
        break
      }
      case 'proceed': {
        btnClass = 'btn__proceed'
        break
      }
      default: {
        break
      }
    }

    let disabled = false

    if (this.props.disabled === true) {
      disabled = true
    } else {
      disabled = false
    }

    return (
      <button type='button' className={'btn ' + btnClass} disabled={disabled}>{label}</button>
    )
  }
}

Button.defaultProps = {
  label: 'Submit: '
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool
}
