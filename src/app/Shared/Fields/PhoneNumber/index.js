import React, { Component, PropTypes } from 'react'

import Phone from 'react-phone-number-input'

import ErrorMessage from '../../ErrorMessage'

import './index.css'

export default class PhoneNumber extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)

    this.state = {
      value: ''
    }
  }

  onChange (event) {
    this.setState({
      value: event.target.value
    }, () => {
      this.props.onChange(this.state.value)
    })
  }

  render () {
    const selection = this.props.selection || this.state.value
    const onChange = this.props.onChange
    const status = this.props.status
    const label = this.props.label
    const message = this.props.errorMessage
    const classes = 'phone-number__input ' + (this.props.status === 'error' ? 'error' : '')

    let showError = false

    if (this.props.status === 'error') {
      showError = true
    } else {
      showError = false
    }

    return (
      <div className='phone-number__container'>
        <p className={'phone-number__label ' + (this.props.status === 'error' ? 'error-text' : '')}>{label}</p>
        <Phone
          placeholder='Enter phone number'
          selection={selection}
          onChange={onChange}
          status={status}
          label={label}
          country='US'
          countries={['US']}
          value={selection}
          className={classes}
        />
        <ErrorMessage
          message={message}
          showError={showError}
        />
      </div>

    )
  }
}

PhoneNumber.defaultPropTypes = {
  errorMessage: '',
  label: '',
  status: ''
}

PhoneNumber.propTypes = {
  selection: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  status: PropTypes.string,
  label: PropTypes.string,
  errorMessage: PropTypes.string
}
