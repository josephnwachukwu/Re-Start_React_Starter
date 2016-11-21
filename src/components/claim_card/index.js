import React, {PropTypes} from 'react'
import './index.css'

const ClaimCard = props => {
  return (
    <div className='grid firm-claim-card' onClick={props.onClick}>
      <div className='grid__col-1'>
        <img className='firm-claim-card__icon' src={props.card.pinned ? 'src/theme/icons/Pin-1.svg' : 'src/theme/icons/Unpin-1.svg'} />
      </div>
      <div className='grid__col-2'>
        <p className='firm-claim-card__number'>{props.card.number}</p>
      </div>
      <div className='grid__col-2'>
        <p className='firm-claim-card__name'>{props.card.name}</p>
      </div>
      <div className='grid__col-2'>
        <p className='firm-claim-card__birthday'>{props.card.birthday}</p>
      </div>
      <div className='grid__col-2'>
        <p className='firm-claim-card__injury-date'>{props.card.injuryDate}</p>
      </div>
      <div className='grid__col-3'>
        <div className='firm-claim-card__buttons'>
          <a className='firm-claim-card__quote-button' href='javascript:void(0)'>Quick Quote</a>
          <a className='firm-claim-card__order-button' href='javascript:void(0)'>Quick Order</a>
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
