import React, { Component, PropTypes } from 'react'
import { stripTimezone } from '../../Shared/Utils'
import format from 'date-fns/format'

import Pinned from '../../../theme/icons/Pinned.svg'
import Unpinned from '../../../theme/icons/Unpinned.svg'

import './index.css'

export default class ClaimCard extends Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    alert('ClaimCard Clicked')
  }

  render () {
    const name = `${this.props.claim.PatientLastName}, ${this.props.claim.PatientFirstName}`
    const DOI = format(
      stripTimezone(this.props.claim.DOI),
      'MM/DD/YYYY'
    )
    const DOB = format(
      stripTimezone(this.props.claim.DOB),
      'MM/DD/YYYY'
    )

    return (
      <div className='grid claim-card' onClick={this.onClick}>
        <div className='grid__col-1'>
          <a className='claim-card__icon'>
            {this.props.claim.IsPinned ? <Pinned /> : <Unpinned />}
          </a>
        </div>
        <div className='grid__col-2'>
          <p className='claim-card__number'>{this.props.claim.ClaimNumber}</p>
        </div>
        <div className='grid__col-2'>
          <p className='claim-card__name'>{name}</p>
        </div>
        <div className='grid__col-2'>
          <p className='claim-card__birthday'>{DOB}</p>
        </div>
        <div className='grid__col-2'>
          <p className='claim-card__injury-date'>{DOI}</p>
        </div>
        <div className='grid__col-3'>
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
  })
}
