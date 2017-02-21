import React, { Component, PropTypes } from 'react'

import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'

import CalendarIcon from '../../../theme/icons/Calendar-History-Filter.svg'

import ErrorMessage from '../ErrorMessage'

import './index.css'

export default class DatePicker extends Component {

  render () {
    let Fmt = ''
    if (this.props.enableTime === true) {
      Fmt = 'm / d / Y   |   h:i'
    } else {
      Fmt = 'm / d / Y'
    }

    const options = Object.assign(
      {},
      {
        defaultDate: this.props.selection,
        altFormat: Fmt,
        dateFormat: Fmt,
        altInput: true,
        altInputClass: this.props.status
      },
      this.props.options
    )

    const onChange = this.props.onChange
    const placeholder = this.props.placeholder
    const label = this.props.label
    const enableTime = this.props.enableTime || false
    const message = this.props.errorMessage

    let showError = false

    if (this.props.status === 'error') {
      showError = true
    } else {
      showError = false
    }

    return (
      <div className={'date-picker__container  ' + (showError ? 'date-picker__error' : '')}>
        <p className={'date-picker__label ' + (showError ? 'error-text' : '')}>{label}</p>
        <Flatpickr
          onChange={onChange}
          options={options}
          placeholder={placeholder}
          data-enable-time={enableTime}
        />
        <CalendarIcon />
        <ErrorMessage
          message={message}
          showError={showError}
        />
      </div>
    )
  }
}

DatePicker.defaultProps = {
  placeholder: 'MM / DD / YYYY',
  options: {
    nextArrow: '<svg width="10px" height="16px" viewBox="0 0 10 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Arrow---Right" fill="#2D7DAB"><polygon id="Rectangle-15" transform="translate(5.000000, 8.000000) rotate(90.000000) translate(-5.000000, -8.000000) " points="-3 11 5 3 13 11 11 13 5 7 -1 13"></polygon></g></g></svg>',
    prevArrow: '<svg width="10px" height="16px" viewBox="0 0 10 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Arrow---Left" fill="#2D7DAB"><polygon id="Rectangle-15" transform="translate(5.000000, 8.000000) rotate(-90.000000) translate(-5.000000, -8.000000) " points="-3 11 5 3 13 11 11 13 5 7 -1 13"></polygon></g></g></svg>',
    altInputClass: ''
  },
  selection: ''
}

DatePicker.propTypes = {
  selection: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  enableTime: PropTypes.bool,
  status: PropTypes.string,
  errorMessage: PropTypes.string
}
