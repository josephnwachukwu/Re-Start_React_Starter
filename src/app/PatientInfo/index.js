import React, { Component } from 'react'

import PatientActionCard from '../Shared/PatientActionCard'
import actionCardMockData from './Api/actionCardMockData.json'

import LoadingSpinner from '../../theme/spinners/ring-alt-loader.svg'

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
    this.setState({
      actions: actionCardMockData.Payload[0].Actions,
      loading: false
    })
  }

  render () {
    const loading = this.state.loading
    const actions = this.state.actions || []

    if (loading) {
      return (
        <LoadingSpinner className='patient-info-container__loading-spinner' />
      )
    } else {
      return (
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
      )
    }
  }
}
