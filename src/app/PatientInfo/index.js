import React, { Component } from 'react'
import format from 'date-fns/format'

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
    const firstAction = actions[0] || {}
    const firstActionDate = firstAction.ActionDate || ''
    let prevDate = format(firstActionDate, 'MMM D')

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
                actions.map((action, key) => {
                  let currDate = format(action.ActionDate, 'MMM D')
                  let addDivider = (currDate !== prevDate)
                  prevDate = currDate
                  return (
                    <div key={key}>
                      {addDivider ? <div className='grid__col-12 patient-info-container__divider' /> : ''}
                      <PatientActionCard
                        action={action}
                        key={action.ActionId}
                      />
                    </div>
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
