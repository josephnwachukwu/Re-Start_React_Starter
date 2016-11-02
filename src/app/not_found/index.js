import React from 'react'
import { Link } from 'react-router'
import './index.css'

export default () => (
  <div>
    <p>
      Page not found.
    </p>
    <p>
      <Link to='/'>Go back to Home page</Link>
    </p>
  </div>
)
