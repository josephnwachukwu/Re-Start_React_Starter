import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { stripTimezone } from '../../Shared/Utils'
import format from 'date-fns/format'

import PinButton from '../../Shared/PinButton'

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
    const url = 'patientinfo?claimId=' + this.props.claim.ClaimSystemId

    return (
      <div className='grid claim-card'>
        <div className='grid__col-1 claim-card__pin'>
          <PinButton
            claimId={this.props.claim.ClaimSystemId}
            pinned={this.props.claim.IsPinned}
            updatePinnedStatus={this.props.updatePinnedStatus}
          />
        </div>
        <div className='grid__col-2'>
          <Link className='claim-card__link' to={url}>
            <p className='claim-card__number'>{this.props.claim.ClaimNumber}</p>
          </Link>
        </div>
        <div className='grid__col-2'>
          <Link to={url}>
            <p className='claim-card__name'>{name}</p>
          </Link>
        </div>
        <div className='grid__col-2'>
          <Link to={url}>
            <p className='claim-card__birthday'>{DOB}</p>
          </Link>
        </div>
        <div className='grid__col-2'>
          <Link to={url}>
            <p className='claim-card__injury-date'>{DOI}</p>
          </Link>
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
    ClaimSystemId: PropTypes.string,
    ClaimNumber: PropTypes.string,
    PatientFirstName: PropTypes.string,
    PatientLastName: PropTypes.string,
    DOB: PropTypes.string,
    DOI: PropTypes.string
  }),
  updatePinnedStatus: PropTypes.func
}
