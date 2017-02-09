import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import Select from 'react-select'

import { getSearchResults } from './Api'

import SearchIcon from '../../../../theme/icons/Search.svg'
import ExpandIcon from '../../../../theme/icons/PatientCard/Expanded.svg'

import 'react-select/dist/react-select.css'
import './index.css'

export default class TypeAhead extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.onOpen = this.onOpen.bind(this)
    this.onClose = this.onClose.bind(this)
    this.getOptions = _.debounce(this.getOptions.bind(this), props.debounceTime)
    this.renderOptions = this.renderOptions.bind(this)
    this.renderArrow = this.renderArrow.bind(this)

    this.state = {
      loading: false,
      open: false,
      options: [],
      value: ''
    }
  }

  onChange (newValue) {
    this.setState({
      value: newValue
    })

    this.props.onChange(newValue)
  }

  onOpen () {
    this.setState({
      open: true
    })
  }

  onClose () {
    this.setState({
      open: false
    })
  }

  getOptions (input) {
    // abort in-flight request and replace with latest one
    if (this.ajaxRequest && this.ajaxRequest.abort) {
      this.ajaxRequest.abort()
    }

    if (input.length >= this.props.minNumCharacters) {
      this.setState(
        {loading: true},
        () => {
          this.ajaxRequest = getSearchResults(input, this.props.fieldName)
          this.ajaxRequest.then((response) => {
            let options = []

            response.Payload.Results.map((result) => {
              options.push({
                value: result[0],
                label: result
              })
            })

            this.setState({
              loading: false,
              options: options
            })
          })
        }
      )
    }
  }

  renderOptions (option) {
    return (
      <div className='type-ahead__option'>
        {
          option.label.map((label, key) => {
            return (
              <div className={key === option.label.length - 1 ? 'type-ahead__option-content--last' : 'type-ahead__option-content'} key={key}>
                {label}
              </div>
            )
          })
        }
      </div>
    )
  }

  renderValue (option) {
    let value = ''
    option.label.map((label, key) => {
      value += label

      if (key !== option.label.length - 1) {
        value += ' - '
      }
    })

    return value
  }

  renderArrow () {
    if (this.state.open) {
      return (
        <SearchIcon />
      )
    } else {
      return (
        <ExpandIcon />
      )
    }
  }

  render () {
    return (
      <div className='type-ahead__container'>
        <div className='type-ahead__label'>{this.props.label}</div>
        <Select
          className='type-ahead__dropdown'
          name='type-ahead__input'
          placeholder={this.props.placeholder}
          value={this.state.value}
          options={this.state.options}
          onChange={this.onChange}
          onInputChange={this.getOptions}
          onOpen={this.onOpen}
          onClose={this.onClose}
          optionRenderer={this.renderOptions}
          valueRenderer={this.renderValue}
          arrowRenderer={this.renderArrow}
          isLoading={this.state.loading}
          clearable={false}
        />
      </div>
    )
  }
}

TypeAhead.defaultPropTypes = {
  debounceTime: 0,
  fieldName: '',
  label: '',
  minNumCharacters: 1,
  placeholder: ''
}

TypeAhead.propTypes = {
  debounceTime: PropTypes.number,
  label: PropTypes.string,
  minNumCharacters: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  fieldName: PropTypes.string.isRequired
}
