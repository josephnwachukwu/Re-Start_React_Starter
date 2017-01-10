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
        <div className='view-switcher__collapse-button' onClick={props.toggleCardExpanded}>
          <div className='view-switcher__collapse-button-text'>COLLAPSE ALL</div>
          <div className={'view-switcher__collapse-button-circle'} />
        </div>
      )
    } else if (!props.cardExpanded) {
      return (
        <div className='view-switcher__expand-button' onClick={props.toggleCardExpanded}>
          <div className={'view-switcher__expand-button-circle'} />
          <div className='view-switcher__expand-button-text'>EXPAND ALL</div>
        </div>
      )
    }
  }

  // TODO: CF 01-03-2016: add sliding animation
  return (
    <div className='view-switcher'>
      <div className='view-switcher__buttons'>
        {toggleCollapseExpand()}
        <div
          className={props.cardLayout === 'row' ? 'view-switcher__row-button--active' : 'view-switcher__row-button'}
          onClick={() => props.toggleCardLayout('row')}>
          {props.cardLayout === 'row' ? <ListViewActive /> : <ListView />}
        </div>
        <div
          className={props.cardLayout === 'col' ? 'view-switcher__col-button--active' : 'view-switcher__col-button'}
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
