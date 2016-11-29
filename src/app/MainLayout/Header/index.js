import React, {PropTypes} from 'react'

import HeaderDropdown from './HeaderDropdown'
import Logo from '../../../theme/icons/Logo.svg'

import './index.css'

const Header = props => {
  var name = props.name
  var fields = props.fields

  return (
    <div className='header'>
      <Logo className='header__icon' />
      <HeaderDropdown name={name} fields={fields} />
    </div>
  )
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired
}

export default Header
