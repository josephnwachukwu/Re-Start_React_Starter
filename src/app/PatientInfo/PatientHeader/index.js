import React, { PropTypes } from 'react'
import './index.css'

import QuickActions from './QuickActions'
import ReturnButton from '../../../theme/icons/Return-to-Page.svg'

const PatientHeader = props => {
  const name = props.patientFirstName + ' ' + props.patientLastName

  return (
    <div className='patient-header'>
      <div className='patient-header__icon'>
        <ReturnButton />
      </div>
      <div className='patient-header__label'>
        <p className='patient-header__label-name'>{name}</p>
        <p className='patient-header__label-claim-number'>{props.claimNumber}</p>
      </div>
      <div className='patient-header__quick-actions'>
        <QuickActions />
      </div>
    </div>
  )
}

PatientHeader.propTypes = {
  patientFirstName: PropTypes.string,
  patientLastName: PropTypes.string,
  claimNumber: PropTypes.string
}

export default PatientHeader