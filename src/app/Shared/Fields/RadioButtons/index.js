import React, {Component, PropTypes} from 'react'

import ErrorMessage from '../../ErrorMessage'

import './index.css'

export default class RadioButtons extends Component {
  constructor (props) {
    super(props)

    this.onOptionChange = this.onOptionChange.bind(this)
    this.renderOption = this.renderOption.bind(this)

    this.state = {
      options: this.props.options,
      selection: this.props.selection
    }
  }

  onOptionChange (event) {
    event.stopPropagation()

    const selection = parseInt(event.target.value, 10)

    if (selection !== this.state.selection) {
      this.setState({ selection }, () => {
        this.props.onChange(selection)
      })
    }
  }

  renderOption (option, index) {
    const groupId = `radio-buttons__option-group-${this.props.label}`
    const optionId = `radio-buttons__${groupId}-${option.Index}`
    const isOptionSelected = (option.Index === this.state.selection)

    let labelClasses = 'radio-buttons__radio-button-label'

    if (isOptionSelected) {
      labelClasses = 'radio-buttons__radio-button-label radio-button__selected'
    }

    return (
      <li key={index}
        className='radio-buttons__radio-button-container'>
        <input
          className='radio-button__input'
          onChange={this.onOptionChange}
          type='radio'
          id={optionId}
          name={groupId}
          value={option.Index}
          />
        <label
          htmlFor={optionId}
          className={labelClasses}>
          <div className='radio-button__bullet' />
          <div className='radio-button__label-text'>
            {option.Value}
          </div>
        </label>
      </li>
    )
  }

  render () {
    const {options} = this.state
    const errorMessageText = `— ${this.props.errorMessage}`

    let showError = false
    let labelClasses = 'radio-buttons__label-text'
    let groupClasses = 'radio-buttons__group'

    if (this.props.status === 'error') {
      showError = true
      labelClasses = 'radio-buttons__label-text error-text'
      groupClasses = 'radio-buttons__group error-border'
    }

    return (
      <div className='radio-buttons__main-container'>
        <div className='radio-buttons__label'>
          <div className={labelClasses}>
            {this.props.label}
          </div>
        </div>
        <ul className={groupClasses}>
          {options.map(this.renderOption)}
        </ul>
        <ErrorMessage
          message={errorMessageText}
          showError={showError} />
      </div>
    )
  }
}

RadioButtons.defaultProps = {
  label: '',
  status: '',
  errorMessage: 'Required Field'
}

RadioButtons.propTypes = {
  options: PropTypes.array.isRequired,
  selection: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  status: PropTypes.string,
  errorMessage: PropTypes.string
}
