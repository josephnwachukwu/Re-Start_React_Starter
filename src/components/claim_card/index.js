import React, {PropTypes} from 'react'
import './index.css'

const ClaimCard = props => {
  return (
    <tr className='firm-claim-card'>
      <td className='firm-claim-card__icon' onClick={props.onClick}><img src={props.pinned ? 'src/theme/icons/Pin-1.svg' : 'src/theme/icons/Unpin-1.svg'} /></td>
      <td className='firm-claim-card__number' onClick={props.onClick}><p>{props.number}</p></td>
      <td className='firm-claim-card__name' onClick={props.onClick}><p>{props.name}</p></td>
      <td className='firm-claim-card__birthday' onClick={props.onClick}><p>{props.birthday}</p></td>
      <td className='firm-claim-card__injury-date' onClick={props.onClick}><p>{props.injuryDate}</p></td>
      <td className='firm-claim-card__buttons'>
        <a className='firm-claim-card__quote-button' href='javascript:;'>Quick Quote</a>
        <a className='firm-claim-card__order-button' href='javascript:;'>Quick Order</a>
      </td>
    </tr>
  )
}

ClaimCard.propTypes = {
  pinned: PropTypes.bool,
  number: PropTypes.string,
  name: PropTypes.string,
  birthday: PropTypes.string,
  injuryDate: PropTypes.string,
  onClick: PropTypes.func
}

export default ClaimCard
