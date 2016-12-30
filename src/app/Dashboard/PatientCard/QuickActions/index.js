import React, { PropTypes } from 'react'

import './index.css'

const QuickActions = props => {
  return (
    <div className='grid__col-12 quick-actions'>
      <div className='quick-action__buttons'>
        <span className='quick-actions__quick-quote'>Quick Quote</span>
        <span className='quick-actions__quick-order'>Quick Order</span>
        <span className='quick-actions__expand-all' onClick={props.toggleExpanded}>
          {props.expanded ? 'Collapse All' : 'Expand All'}
        </span>
        <span className='quick-actions__label'>QUICK ACTIONS</span>

      </div>
    </div>
  )
}

QuickActions.defaultProps = {
  expanded: false
}

QuickActions.propTypes = {
  expanded: PropTypes.bool,
  toggleExpanded: PropTypes.func
}

export default QuickActions