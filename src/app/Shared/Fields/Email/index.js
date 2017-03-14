import React, { Component, PropTypes } from 'react'
import classNames from 'classNames'

import '../index.css'

export default class Email extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)

    this.state = {
      value: '',
      valid: true,
      invalid: false,
      classes: classNames({
        pristine: true,
        valid: true
      })
    }
  }

  onChange (event) {
    if (this.props.required && !this.state.value) {
      this.setState({valid: false, invalid: true})
    }
    this.setState({
      value: event.target.value,
      classes: classNames({
        dirty: true,
        pristine: false,
        touched: true
      })
    }, () => {
      this.onChange(this.state.value)
    })
  }

  onFocus (event) {
    this.setState({
      classes: classNames({
        touched: true,
        valid: true
      })
    })
  }

  render () {
    const label = this.props.label
    const placeholder = this.props.placeholder

    var options = {}
    if (this.props.disabled) {
      options['disabled'] = 'disabled'
    }

    if (this.props.required) {
      options['required'] = 'required'
    }

    if (this.props.readOnly) {
      options['readonly'] = 'readonly'
    }

    return (
      <div className='form-row'>
        <label className={'form-row__label '}>{label}</label>
        <input className={'form-row__input ' + this.state.classes}
          type='email'
          onChange={this.onChange}
          placeholder={placeholder}
          {...options}
          onFocus={this.onFocus}
        />
      </div>
    )
  }
}

Email.defaultProps = {
  label: 'Email Address:',
  placeholder: 'eg: JohnDoe@example.com'
}

Email.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool
}
