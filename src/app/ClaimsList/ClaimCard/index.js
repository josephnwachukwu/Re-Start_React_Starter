import React, { Component, PropTypes } from 'react'
import format from 'date-fns/format'

import Pin from '../../../theme/icons/Pin-1.svg'
import Unpin from '../../../theme/icons/Unpin-1.svg'

import './index.css'

export default class ClaimCard extends Component {
  constructor (props) {
    super(props)

    const name = `${props.claim.PatientLastName}, ${props.claim.PatientFirstName}`
    const DOI = format(
      props.claim.DOI,
      'MM/DD/YYYY'
    )
    const DOB = format(
      props.claim.DOB,
      'MM/DD/YYYY'
    )

    this.state = {
      name,
      DOI,
      DOB
    }
  }

  render () {
    return (
      <div className='grid claim-card' onClick={this.props.onClick}>
        <div className='grid__col-1'>
          <a className='claim-card__icon'>
            {this.props.claim.IsPinned ? <Pin /> : <Unpin />}
          </a>
        </div>
        <div className='grid__col-2'>
          <p className='claim-card__number'>{this.props.claim.ClaimNumber}</p>
        </div>
        <div className='grid__col-2'>
          <p className='claim-card__name'>{this.state.name}</p>
        </div>
        <div className='grid__col-auto'>
          <p className='claim-card__birthday'>{this.state.DOB}</p>
        </div>
        <div className='grid__col-auto'>
          <p className='claim-card__injury-date'>{this.state.DOI}</p>
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
}

ClaimCard.propTypes = {
  claim: PropTypes.shape({
    IsPinned: PropTypes.bool,
    ClaimNumber: PropTypes.string,
    PatientFirstName: PropTypes.string,
    PatientLastName: PropTypes.string,
    DOB: PropTypes.string,
    DOI: PropTypes.string
  }),
  onClick: PropTypes.func
}
