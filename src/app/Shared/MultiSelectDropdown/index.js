import React, { PropTypes } from 'react'
import Select from 'react-select'

import 'react-select/dist/react-select.css'
import './index.css'

const MultiSelectDropdown = props => {
  return (
    <div className='multi-select-dropdown-container'>
      <div className='multi-select-dropdown-label'>{props.label}</div>
      <Select
        className='multi-select-dropdown'
        name='multi-select-dropdown__input'
        placeholder={props.placeholder}
        value={props.value}
        options={props.options}
        onChange={props.onChange}
        clearable={false}
        searchable={false}
        multi
        openAfterFocus
        openOnFocus />
    </div>
  )
}

MultiSelectDropdown.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.array,
  options: PropTypes.array,
  onChange: PropTypes.func
}

export default MultiSelectDropdown
