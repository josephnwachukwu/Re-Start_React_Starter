import React from 'react'

import './index.css'

const ColumnHeader = props => {
  return (
    <div className='grid claims__listHeader'>
      <div className='grid__col-1 claims__column-header'>
        Pin
      </div>

      <div className='grid__col-2'>
        Claim Number
      </div>

      <div className='grid__col-2'>
        Name
      </div>

      <div className='grid__col-auto'>
        Date of Birth
      </div>

      <div className='grid__col-auto'>
        Date of Injury
      </div>

      <div className='grid__col-4'>
        Quick Actions
      </div>
    </div>
  )
}

ColumnHeader.propTypes = {

}

export default ColumnHeader
