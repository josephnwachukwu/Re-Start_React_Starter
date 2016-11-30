import React, { PropTypes } from 'react'

import './index.css'

const Subheader = props => {
  return (
    <div className='grid'>
      <div className='grid__col-lg-12 subheader'>
        <h2 className='subheader__header'>Active Claims <span className='subheader__badge'>{props.claimCount}</span></h2>
      </div>
    </div>
  )
}

Subheader.propTypes = {
  claimCount: PropTypes.number
}

export default Subheader
