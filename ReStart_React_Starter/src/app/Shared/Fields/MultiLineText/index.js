import React, { Component, PropTypes } from 'react'

import ErrorMessage from '../../ErrorMessage'

import './index.css'

export default class MultiLineText extends Component {
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
      <div className='multi-line-text__container'>
        <p className={'multi-line-text__label ' + (showError ? 'error-text' : '')}>{label}</p>
        <textarea className={'multi-line-text__textarea ' + (showError ? 'error-border' : '')}
          onChange={this.onChange}
          placeholder={placeholder}
          value={selection}
          />
        <ErrorMessage
          message={message}
          showError={showError}
        />
      </div>
    )
  }
}

MultiLineText.defaultPropTypes = {
  selection: '',
  label: '',
  placeholder: ''
}

MultiLineText.propTypes = {
  label: PropTypes.string,
  selection: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  status: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string
}
