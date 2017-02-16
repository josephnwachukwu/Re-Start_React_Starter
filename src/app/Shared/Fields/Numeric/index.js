import React, {Component, PropTypes} from 'react'

import ErrorMessage from '../../ErrorMessage'

import './index.css'

export default class Numeric extends Component {
  constructor (props) {
    super(props)

    this.validateInput = this.validateInput.bind(this)
    this.validateMinimum = this.validateMinimum.bind(this)
    this.validateMaximum = this.validateMaximum.bind(this)
  }

  validateMinimum (value, validation) {
    if (!isNaN(validation.min)) {
      if (value < validation.min) {
        return false
      }
    }
    return true
  }

  validateMaximum (value, validation) {
    if (!isNaN(validation.max)) {
      if (value > validation.max) {
        return false
      }
    }
    return true
  }

  validateInput (event) {
    const value = parseInt(event.target.value, 10)
    const {validation} = this.props
    const minValid = this.validateMinimum(value, validation)
    const maxValid = this.validateMaximum(value, validation)
    const valid = minValid && maxValid

    const data = {
      valid,
      value
    }

    this.props.onChange(data)
  }

  render () {
    const errorMessageText = `— ${this.props.errorMessage}`

    let showError = false
    let labelClasses = 'numeric__label-text'
    let fieldClasses = 'numeric__input'

    if (this.props.status === 'error') {
      showError = true
      labelClasses = 'numeric__label-text error-text'
      fieldClasses = 'numeric__input error-border'
    }

    return (
      <div className='numeric__main-container'>
        <div className='numeric__label'>
          <div className={labelClasses}>{this.props.label}</div>
        </div>
        <input
          className={fieldClasses}
          type='number'
          defaultValue={this.props.selection}
          placeholder={this.props.placeholder}
          onChange={this.validateInput} />
        <ErrorMessage
          message={errorMessageText}
          showError={showError} />
      </div>
    )
  }
}

Numeric.defaultProps = {
  label: '',
  status: '',
  validation: {},
  placeholder: '',
  errorMessage: 'Invalid value'
}

Numeric.propTypes = {
  selection: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  status: PropTypes.string,
  validation: PropTypes.object,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string
}
