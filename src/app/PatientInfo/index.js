import React, { Component, PropTypes } from 'react'

import { getClaimActions, getPatientInfo } from './Api'

import PatientActionCard from '../Shared/PatientActionCard'
import PatientHeader from './PatientHeader'
import PatientInfoTabs from './PatientInfoTabs'

import LoadingSpinner from '../../theme/spinners/Animation-Loader.svg'

import './index.css'

export default class PatientInfo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      actions: [],
      claimInfo: [],
      loading: true,
      claimId: props.location.query.claimId
    }
  }

  componentDidMount () {
    const claimId = 'f389d478-a64b-4693-b6ad-923bd6f24716'
    let getClaimPromise = getClaimActions(claimId)
      .then((response) => {
        this.setState({
          actions: response.Payload.Actions
        })
      })

    let getPatientPromise = getPatientInfo(this.state.claimId)
      .then((response) => {
        this.setState({
          claimInfo: response.Payload
        })
      })

    Promise.all([getClaimPromise, getPatientPromise])
      .then(() => {
        this.setState({
          loading: false
        })
      })
  }

  render () {
    const loading = this.state.loading
    const actions = this.state.actions || []
    const claimInfo = this.state.claimInfo || []

    if (loading) {
      return (
        <div className='patient-info-spinner-container'>
          <LoadingSpinner />
        </div>
      )
    } else {
      return (
        <div className='patient-info'>
          <PatientHeader
            patientFirstName={claimInfo.PatientFirstName}
            patientLastName={claimInfo.PatientLastName}
            claimNumber={claimInfo.ClaimNumber}
          />
          <div className='patient-info-tab'>
            <PatientInfoTabs info={claimInfo.Info} />
          </div>
          <div className='grid patient-info-container'>
            <div className='grid__col-12'>
              <div className='grid__col-12 patient-info-container__title'>
                <span>Patient Info Placeholder</span>
              </div>
              <div className='grid__col-12 patient-info-container__cards'>
                {
                  actions.map((action) => {
                    return (
                      <PatientActionCard
                        action={action}
                        key={action.ActionId}
                      />
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

PatientInfo.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      claimId: PropTypes.string.isRequired
    })
  })
}
