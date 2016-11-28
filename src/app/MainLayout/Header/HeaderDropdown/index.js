import React, { PropTypes } from 'react'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'

import './index.css'

const HeaderDropdown = props => {
  var name = props.name
  var fields = props.fields
  var shown = false

  function onClick () {
    if (shown) {
      Dropdown.hide()
    } else {
      Dropdown.show()
    }
  }

  return (
    <div className='firm-dropdown'>
      <span className='firm-dropdown__icon'>□</span>
      <Dropdown>
        <DropdownTrigger className='firm-dropdown__trigger' onClick={onClick}>
          <span>Welcome <span className='firm-dropdown__name'>{name}</span> □</span>
        </DropdownTrigger>
        <DropdownContent>
          <ul className='firm-dropdown__ul'>
            {
              fields.map((field, key) => {
                return (
                  <li key={key} className={key === 0 ? 'firm-dropdown__first-item' : key === fields.length - 1 ? 'firm-dropdown__last-item' : 'firm-dropdown__item'}>
                    <a className='firm-dropdown__link' onClick={field.onClick}>{field.name}</a>
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
