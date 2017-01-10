import React, { PropTypes } from 'react'
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown'
import { Link } from 'react-router'

import './index.css'

const HeaderDropdown = props => {
  const name = props.name
  const fields = props.fields

  return (
    <div className='dropdown-container'>
      <div className='dropdown__icon'>□</div>
      <Dropdown>
        <DropdownTrigger className='dropdown__trigger'>
          <span>Welcome <span className='dropdown__name'>{name}</span></span>
        </DropdownTrigger>
        <DropdownContent>
          <ul className='dropdown__ul'>
            {
              fields.map((field, key) => {
                return (
                  <li key={key} className='dropdown__item'>
                    <Link className='dropdown__link' to={field.url}>{field.name}</Link>
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
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
}

export default HeaderDropdown
