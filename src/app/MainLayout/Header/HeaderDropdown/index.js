import React, { PropTypes } from 'react'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'

import './index.css'

const HeaderDropdown = props => {
  const name = props.name
  const fields = props.fields
  let shown = false

  function onClick () {
    if (shown) {
      Dropdown.hide()
      shown = false
    } else {
      Dropdown.show()
      shown = true
    }
  }

  return (
    <div className='dropdown'>
      <span className='dropdown__icon'>□</span>
      <Dropdown>
        <DropdownTrigger className='dropdown__trigger' onClick={onClick}>
          <span>Welcome <span className='dropdown__name'>{name}</span> □</span>
        </DropdownTrigger>
        <DropdownContent>
          <ul className='dropdown__ul'>
            {
              fields.map((field, key) => {
                return (
                  <li key={key} className={key === 0 ? 'dropdown__first-item' : key === fields.length - 1 ? 'dropdown__last-item' : 'dropdown__item'}>
                    <a className='dropdown__link' onClick={field.onClick}>{field.name}</a>
                  </li>
                )
              })
            }
          </ul>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}

HeaderDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired
}

export default HeaderDropdown
