import React from 'react'
import { Link } from 'react-router'

import './index.css'

const NotFound = props => {
  return (
    <div className='page-not-found'>
      <p>
        Page not found.
      </p>
      <p>
        <Link to='/'>Go back to Home page</Link>
      </p>
    </div>
  )
}

NotFound.propTypes = {
}

export default NotFound
