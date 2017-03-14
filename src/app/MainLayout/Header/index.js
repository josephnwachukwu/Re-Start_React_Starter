import React, { Component } from 'react'

import './index.css'

import MenuIcon from '../../../static/images/menu.svg'

export default class Header extends Component {
  constructor (props) {
    super(props)

    this.toggleMenu = this.toggleMenu.bind(this)

    this.state = {
      menuOpen: false
    }
  }

  toggleMenu (event) {
    if (this.state.menuOpen) {
      this.setState({ menuOpen: false })
    } else {
      this.setState({ menuOpen: true })
    }
  }

  render () {
    let active = false

    if (this.state.menuOpen) {
      active = true
    } else {
      active = false
    }

    return (
      <div>
        <header className='header'>
          <div className='logo'>
            <h2>ReStart <span className='header__menu-icon'><MenuIcon onClick={this.toggleMenu} /></span></h2>
          </div>
          <div className={'header__menu-item ' + (active ? 'open' : '')}>
            <a href=''>Item 1</a>
          </div>
          <div className={'header__menu-item ' + (active ? 'open' : '')}>
            <a href=''>Item 2</a>
          </div>
          <div className={'header__menu-item ' + (active ? 'open' : '')}>
            <a href=''>Item 3</a>
          </div>
          <div className={'header__menu-item ' + (active ? 'open' : '')}>
            <a href=''>Item 4</a>
          </div>
          <div className={'header__menu-item ' + (active ? 'open' : '')}>
            <a href=''>Item 5</a>
          </div>
        </header>
      </div>
    )
  }
}
