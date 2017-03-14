import React, { Component, PropTypes } from 'react'
import classNames from 'classNames'

import '../index.css'

export default class Radio extends Component {
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
    const name = this.props.name
    const value = this.props.value

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

    if (this.props.checked) {
      options['checked'] = 'checked'
    }

    return (
      <div className='form-row'>
        <label className={'form-row__label '}>{label}</label>
        <input className={'form-row__input ' + this.state.classes}
          type='radio'
          onChange={this.onChange}
          {...options}
          onFocus={this.onFocus}
          name={name}
          value={value}
        />
      </div>
    )
  }
}

Radio.defaultProps = {
}

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  checked: PropTypes.bool,
  name: PropTypes.string
}
