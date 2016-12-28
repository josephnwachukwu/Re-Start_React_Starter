import React from 'react'

import './index.css'

const ColumnHeader = props => {
  return (
    <div className='grid'>
      <div className='grid__col-12 claims__column-header'>
        <div className='grid'>
          <div className='grid__col-1'>
        Pin
          </div>

          <div className='grid__col-2'>
        Claim Number
          </div>

          <div className='grid__col-2'>
        Name
          </div>

          <div className='grid__col-2'>
        Date of Birth
          </div>

          <div className='grid__col-2'>
        Date of Injury
          </div>

          <div className='grid__col-3'>
        Quick Actions
          </div>
        </div>
      </div>
    </div>
  )
}

ColumnHeader.propTypes = {

}

export default ColumnHeader
