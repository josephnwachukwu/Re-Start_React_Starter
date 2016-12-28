import React, { PropTypes } from 'react'

import CardView from '../../../theme/icons/ToggleViewer-Card.svg'
import ListView from '../../../theme/icons/ToggleViewer-List.svg'

import CardViewActive from '../../../theme/icons/ToggleViewer-Card-Active.svg'
import ListViewActive from '../../../theme/icons/ToggleViewer-List-Active.svg'

import TemporaryIcon from '../../../theme/icons/Temporary-Icon.svg'

import './index.css'

const ViewSwitcher = props => {
  return (
    <div className='view-switcher'>
      <div className='grid view-switcher__buttons'>
        <div className='grid__col- view-switcher__collapse-button' onClick={props.toggleCardExpanded}>
          <span className='view-switcher__collapse-button--text'>{props.cardExpanded ? 'COLLAPSE ALL' : 'EXPAND ALL'}</span>
          <TemporaryIcon />
        </div>
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
