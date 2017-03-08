import React from 'react'

import './index.css'

const Header = props => {
  return (
    <header className='header grid'>
      <div className='logo'>
        <h2>ReStart</h2>
      </div>
      <div>
        <a href=''>Item 1</a>
      </div>
      <div>
        <a href=''>Item 2</a>
      </div>
      <div>
        <a href=''>Item 3</a>
      </div>
      <div>
        <a href=''>Item 4</a>
      </div>
      <div>
        <a href=''>Item 5</a>
      </div>
    </header>
  )
}

export default Header
