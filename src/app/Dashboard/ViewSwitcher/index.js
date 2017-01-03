import React, { PropTypes } from 'react'

import CardView from '../../../theme/icons/ToggleViewer-Card.svg'
import ListView from '../../../theme/icons/ToggleViewer-List.svg'

import CardViewActive from '../../../theme/icons/ToggleViewer-Card-Active.svg'
import ListViewActive from '../../../theme/icons/ToggleViewer-List-Active.svg'

import './index.css'

const ViewSwitcher = props => {
  function toggleCollapseExpand () {
    if (props.cardExpanded) {
      return (
        <div className='grid__col-3 view-switcher__collapse-button' onClick={props.toggleCardExpanded}>
          <div className='grid view-switcher__collapse-button--container'>
            <span className='grid__col-8 view-switcher__collapse-button--text'>COLLAPSE ALL</span>
            <span className={'grid__col-4 view-switcher__collapse-button--circle'} />
          </div>
        </div>
      )
    } else if (!props.cardExpanded) {
      return (
        <div className='grid__col-3 view-switcher__expand-button' onClick={props.toggleCardExpanded}>
          <div className='grid view-switcher__expand-button--container'>
            <span className={'grid__col-4 view-switcher__expand-button--circle'} />
            <span className='grid__col-8 view-switcher__expand-button--text'>EXPAND ALL</span>
          </div>
        </div>
      )
    }
  }

  // TODO: CF 01-03-2016: add sliding animation
  return (
    <div className='view-switcher'>
      <div className='grid view-switcher__buttons'>
        {toggleCollapseExpand()}
        <div
          className={props.cardLayout === 'row' ? 'grid__col-1 view-switcher__row-button--active' : 'grid__col-1 view-switcher__row-button'}
          onClick={() => props.toggleCardLayout('row')}>
          {props.cardLayout === 'row' ? <ListViewActive /> : <ListView />}
        </div>
        <div
          className={props.cardLayout === 'col' ? 'grid__col-1 view-switcher__col-button--active' : 'grid__col-1 view-switcher__col-button'}
          onClick={() => props.toggleCardLayout('col')}>
          {props.cardLayout === 'col' ? <CardViewActive /> : <CardView />}
        </div>
      </div>
    </div>
  )
}

ViewSwitcher.propTypes = {
  cardExpanded: PropTypes.bool,
  cardLayout: PropTypes.string,
  toggleCardExpanded: PropTypes.func,
  toggleCardLayout: PropTypes.func
}

export default ViewSwitcher
