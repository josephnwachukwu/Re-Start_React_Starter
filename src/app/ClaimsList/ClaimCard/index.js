import React, {PropTypes} from 'react'

import Pin from '../../../theme/icons/Pin-1.svg'
import Unpin from '../../../theme/icons/Unpin-1.svg'

import './index.css'

const ClaimCard = props => {
  return (
    <div className='grid claim-card' onClick={props.onClick}>
      <div className='grid__col-1'>
        <a className='claim-card__icon'>
          {props.card.pinned ? <Pin /> : <Unpin />}
        </a>
      </div>
      <div className='grid__col-2'>
        <p className='claim-card__number'>{props.card.number}</p>
      </div>
      <div className='grid__col-2'>
        <p className='claim-card__name'>{props.card.name}</p>
      </div>
      <div className='grid__col-auto'>
        <p className='claim-card__birthday'>{props.card.birthday}</p>
      </div>
      <div className='grid__col-auto'>
        <p className='claim-card__injury-date'>{props.card.injuryDate}</p>
      </div>
      <div className='grid__col-4'>
        <div className='claim-card__buttons'>
          <a className='claim-card__quote-button' href='javascript:void(0)'>Quick Quote</a>
          <a className='claim-card__order-button' href='javascript:void(0)'>Quick Order</a>
        </div>
      </div>
    </div>
  )
}

ClaimCard.propTypes = {
  card: PropTypes.shape({
    pinned: PropTypes.bool,
    number: PropTypes.string,
    name: PropTypes.string,
    birthday: PropTypes.string,
    injuryDate: PropTypes.string
  }),
  onClick: PropTypes.func
}

export default ClaimCard
