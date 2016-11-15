import React, {PropTypes} from 'react'
import HeaderDropdown from '../header_dropdown'
import './index.css'

const Header = props => {
  var name = props.name
  var fields = props.fields

  return (
    <div className='firm-header'>
      <img className='firm-header__icon' src='src/theme/icons/Logo.svg' />
      <HeaderDropdown name={name} fields={fields} />
    </div>
  )
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired
}

export default Header
