import React, {PropTypes} from 'react'

import HeaderDropdown from './HeaderDropdown'

import Logo from '../../../theme/icons/Logo.svg'
import LoginFigure from '../../../theme/icons/Top-Nav-Login-Figure.svg'
import SettingsIcon from '../../../theme/icons/Top-Nav-Settings.svg'

import './index.css'

const Header = props => {
  var name = props.name
  var fields = props.fields

  return (
    <div className='header'>
      <Logo className='header__icon' />
      <div className='header__settings'>
        <SettingsIcon />
      </div>
      <div className='header__login-figure'>
        <LoginFigure />
      </div>
      <HeaderDropdown name={name} fields={fields} />
    </div>
  )
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired
}

export default Header
