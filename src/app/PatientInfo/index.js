import React, { Component } from 'react'

import PatientActionCard from '../Shared/PatientActionCard'
import { getClaimActions } from './Api'

import PatientHeader from './PatientHeader'
import LoadingSpinner from '../../theme/spinners/ring-alt-loader.svg'
import MockData from './Api/mockData.json'

import './index.css'

export default class PatientInfo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      actions: [],
      loading: true
    }
  }

  componentDidMount () {
    const claimId = 'f389d478-a64b-4693-b6ad-923bd6f24716'
    getClaimActions(claimId)
      .then((response) => {
        this.setState({
          actions: response.Payload.Actions,
          loading: false
        })
      })
  }

  render () {
    const loading = this.state.loading
    const actions = this.state.actions || []
    const claimInfo = MockData.Payload[0]

    if (loading) {
      return (
        <div className='patient-info-spinner-container'>
          <LoadingSpinner />
        </div>
      )
    } else {
      return (
        <div>
          <PatientHeader
            patientFirstName={claimInfo.PatientFirstName}
            patientLastName={claimInfo.PatientLastName}
            claimNumber={claimInfo.ClaimNumber}
          />
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
