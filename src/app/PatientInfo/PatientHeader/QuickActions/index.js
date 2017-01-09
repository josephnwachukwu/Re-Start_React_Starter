import React from 'react'

import './index.css'

const QuickActions = props => {
  return (
    <div className='patient-quick-action__buttons'>
      <span className='patient-quick-actions__label'>QUICK ACTIONS</span>
      <button className='patient-quick-actions__notate-file'>Notate File</button>
      <button className='patient-quick-actions__quick-quote'>Quick Quote</button>
      <button className='patient-quick-actions__create-order'>Create Order</button>
    </div>
  )
}

QuickActions.propTypes = {
}

export default QuickActions
