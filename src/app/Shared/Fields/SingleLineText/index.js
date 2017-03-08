import React, { Component, PropTypes } from 'react'

import ErrorMessage from '../../ErrorMessage'

import './index.css'

export default class SingleLineText extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)

    this.state = {
      value: ''
      classes: ['pristine', 'valid', ]
    }
  }

  onChange (event) {
    this.setState({
      value: event.target.value
    }, () => {
      this.props.onChange(this.state.value)
    })
  }

  onFocus (event) {
    this.setState({
      classes: ['touched']
    })
  }

  on


  render () {
    const selection = this.props.selection || this.state.value
    const label = this.props.label
    const placeholder = this.props.placeholder
    const message = this.props.errorMessage

    let showError = false

    if (this.props.status === 'error') {
      showError = true
    } else {
      showError = false
    }

    return (
      <div className='single-line-text__container'>
        <p className={'single-line-text__label ' + (showError ? 'error-text' : '')}>{label}</p>
        <input className={'single-line-text__input ' + (showError ? 'error-border' : '')}
          type='text'
          value={selection}
          onChange={this.onChange}
          placeholder={placeholder}
        />
        <ErrorMessage
          message={message}
          showError={showError}
        />
      </div>
    )
  }
}

SingleLineText.defaultPropTypes = {
  selection: '',
  label: '',
  placeholder: ''
}

SingleLineText.propTypes = {
  label: PropTypes.string,
  selection: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  status: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string
}
