import React, { PropTypes } from 'react'
import Select from 'react-select'

import ErrorMessage from '../../ErrorMessage'

import 'react-select/dist/react-select.css'
import './index.css'

const MultiSelect = props => {
  const status = props.status
  const showError = status === 'error'

  return (
    <div className='multi-select-container'>
      <div className={showError ? 'multi-select__label error-text' : 'multi-select__label'}>{props.label}</div>
      <Select
        className={showError ? 'multi-select__dropdown error-border' : 'multi-select__dropdown'}
        name='multi-select__input'
        placeholder={props.placeholder}
        value={props.selection}
        options={props.options}
        onChange={props.onChange}
        clearable={false}
        searchable={false}
        multi
        openAfterFocus
        openOnFocus />
      <ErrorMessage
        message='required'
        showError={showError}
      />
    </div>
  )
}

MultiSelect.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  selection: PropTypes.array,
  options: PropTypes.array,
  onChange: PropTypes.func,
  status: PropTypes.string
}

export default MultiSelect
