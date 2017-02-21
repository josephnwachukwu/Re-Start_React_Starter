import React, { Component, PropTypes } from 'react'
import Select from 'react-select'

import 'react-select/dist/react-select.css'
import './index.css'

export default class SelectList extends Component {
  render () {
    const status = this.props.status
    const showError = status === 'error'

    return (
      <div className='select-list__container'>
        <div className={showError ? 'select-list__label error-text' : 'select-list__label'}>{this.props.label}</div>
        <Select
          className={showError ? 'select-list__dropdown error-border' : 'select-list__dropdown'}
          name='select-list__input'
          placeholder={this.props.placeholder}
          value={this.props.selection}
          options={this.props.values}
          onChange={this.props.onChange}
          clearable={false}
          searchable={false}
          openAfterFocus
          openOnFocus
          disabled={this.props.values.length === 0} />
      </div>
    )
  }
}

SelectList.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  selection: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  status: PropTypes.string,
  change: PropTypes.bool
}
