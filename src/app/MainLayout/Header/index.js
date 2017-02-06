import React, {PropTypes} from 'react'

import LinkDropdown from '../../Shared/LinkDropdown'
import Search from './Search'

import Logo from '../../../theme/icons/Logo.svg'
import LoginFigure from '../../../theme/icons/Top-Nav-Login-Figure.svg'
import SettingsIcon from '../../../theme/icons/Top-Nav-Settings.svg'

import './index.css'

const Header = props => {
  let name = props.name
  let fields = props.fields

  return (
    <div className='header'>
      <Logo className='header__icon' />
      <div className='header__search-bar'>
        <Search
          minNumCharacters={2}
          resultLimit={25}
          debounceTime={500}
        />
      </div>
      <div className='header__dropdown'>
        <LinkDropdown name={name} fields={fields} />
      </div>
      <div className='header__login-figure'>
        <LoginFigure />
      </div>
      <div className='header__settings'>
        <SettingsIcon />
      </div>
    </div>
  )
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired
}

export default Header
