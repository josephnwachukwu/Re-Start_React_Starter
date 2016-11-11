import React, {PropTypes} from 'react'
import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown'
import './index.css'

const HeaderDropdown = props => {
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
          <span>Welcome <span className='firm-dropdown__name'>{this.props.name}</span> □</span>
        </DropdownTrigger>
        <DropdownContent>
          <ul className='firm-dropdown__ul'>
            {
              this.props.fields.map((field, key) => {
                return (
                  <li key={key} className='firm-dropdown__item'>
                    <a onClick={field.onClick}>{field.name}</a>
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

HeaderDropdown.PropTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired
}

export default HeaderDropdown
