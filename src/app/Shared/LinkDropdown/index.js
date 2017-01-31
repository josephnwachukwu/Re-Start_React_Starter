import React, { PropTypes } from 'react'
import Select from 'react-select'
import { hashHistory } from 'react-router'

import './index.css'

const LinkDropdown = props => {
  const name = props.name
  const fields = props.fields
  let options = fields.map((field) => { return {value: field.url, label: field.name} })

  function onClick (option) {
    hashHistory.push('/' + option.value)
  }

  return (
    <Select
      className='link-dropdown'
      name='link-dropdown__content'
      placeholder={'Welcome ' + name}
      options={options}
      onChange={onClick}
      clearable={false}
      searchable={false}
    />
  )
}

LinkDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
}

export default LinkDropdown
