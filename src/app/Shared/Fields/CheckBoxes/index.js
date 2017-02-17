import React, {Component, PropTypes} from 'react'

import ErrorMessage from '../../ErrorMessage'

import './index.css'

export default class Checkboxes extends Component {
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
    const selectedSet = new Set(this.state.selection)
    const selectedIndex = parseInt(event.target.value, 10)
    const checked = event.target.checked

    if (checked) {
      selectedSet.add(selectedIndex)
    } else {
      selectedSet.delete(selectedIndex)
    }

    const selection = Array.from(selectedSet)

    this.setState({
      selection
    }, () => {
      this.props.onChange(selection)
    })
  }

  renderOption (option, index) {
    const groupId = `checkboxes__option-group-${this.props.label}`
    const optionId = `checkboxes__${groupId}-${option.Index}`

    const isOptionSelected = (this.state.selection.indexOf(option.Index) !== -1)

    let labelClasses = 'checkboxes__checkbox-label'

    if (isOptionSelected) {
      labelClasses = 'checkboxes__checkbox-label checkbox__selected'
    }

    return (
      <li key={index}
        className='checkboxes__checkbox-container'>
        <input
          className='checkbox__input'
          onChange={this.onOptionChange}
          type='checkbox'
          id={optionId}
          name={groupId}
          value={option.Index}
          checked={isOptionSelected}
          />
        <label
          htmlFor={optionId}
          className={labelClasses}>
          <div className='checkbox__bullet' />
          <div className='checkbox__label-text'>
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
    let labelClasses = 'checkboxes__label-text'
    let groupClasses = 'checkboxes__group'

    if (this.props.status === 'error') {
      showError = true
      labelClasses = 'checkboxes__label-text error-text'
      groupClasses = 'checkboxes__group error-border'
    }

    return (
      <div className='checkboxes__main-container'>
        <div className='checkboxes__label'>
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

Checkboxes.defaultProps = {
  label: '',
  status: '',
  errorMessage: 'Required Field',
  selection: []
}

Checkboxes.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  selection: PropTypes.array,
  label: PropTypes.string,
  status: PropTypes.string,
  errorMessage: PropTypes.string
}
