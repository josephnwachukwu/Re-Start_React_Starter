import React, { Component } from 'react'
import startOfWeek from 'date-fns/start_of_week'
import lastDayOfWeek from 'date-fns/last_day_of_week'
import format from 'date-fns/format'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'

import { getClaimActions, getMetrics, getAppointments } from './Api'

import PatientCard from './PatientCard'
import ViewSwitcher from './ViewSwitcher'
import PatientCount from './PatientCount'
import AppointmentCalendar from './AppointmentCalendar'

import LoadingSpinner from '../../theme/spinners/ring-alt-loader.svg'

import './index.css'

export default class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.toggleCardExpanded = this.toggleCardExpanded.bind(this)
    this.toggleCardLayout = this.toggleCardLayout.bind(this)
    this.updatePinnedStatus = this.updatePinnedStatus.bind(this)
    this.getMoreAppointments = this.getMoreAppointments.bind(this)

    // TODO: DC 12-12-2016: Figure out where adjusterId will be coming from
    this.state = {
      claims: [],
      loading: true,
      cardExpanded: true,
      cardLayout: 'col',
      metrics: {},
      appointments: [],
      adjusterId: 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b'
    }
  }

  componentDidMount () {
    let getClaimsPromise = getClaimActions(this.state.adjusterId)
      .then((response) => {
        this.setState({
          claims: response.Payload
        })
      })

    let getMetricsPromise = getMetrics(this.state.adjusterId)
      .then((response) => {
        this.setState({
          metrics: response.Payload
        })
      })

    const startDate = format(startOfWeek(new Date()), 'MM-DD-YYYY')
    const endDate = format(lastDayOfWeek(new Date()), 'MM-DD-YYYY')

    let getAppointmentsPromise = getAppointments(this.state.adjusterId, startDate, endDate)
      .then((response) => {
        this.setState({
          appointments: response.Payload
        })
      })

    Promise.all([
      getClaimsPromise,
      getMetricsPromise,
      getAppointmentsPromise
    ])
      .then(() => {
        this.setState({
          loading: false
        })
      })
  }

  toggleCardExpanded () {
    this.setState({cardExpanded: !this.state.cardExpanded})
  }

  toggleCardLayout (layout) {
    this.setState({cardLayout: layout})
  }

  updatePinnedStatus (claimId, pinnedStatus) {
    let claims = this.state.claims

    for (let i = 0; i < claims.length; i++) {
      let claim = claims[i]
      if (claim.ClaimSystemId === claimId) {
        claim.PinnedStatus = pinnedStatus
        break
      }
    }

    return getMetrics(this.state.adjusterId)
      .then((response) => {
        return this.setState({
          metrics: response.Payload,
          claims
        })
      })
  }

  getMoreAppointments (week = 'prev') {
    const currentStartDate = this.state.appointments[0].Date
    let startDate

    if (week === 'prev') {
      startDate = format(subDays(currentStartDate, 7), 'MM-DD-YYYY')
    } else {
      startDate = format(addDays(currentStartDate, 7), 'MM-DD-YYYY')
    }

    const endDate = format(lastDayOfWeek(startDate), 'MM-DD-YYYY')

    return getAppointments(this.state.adjusterId, startDate, endDate)
      .then((response) => {
        this.setState({
          appointments: response.Payload
        })
      })
  }

  render () {
    const loading = this.state.loading
    const claims = this.state.claims
    const cardLayout = this.state.cardLayout
    const cardExpanded = this.state.cardExpanded
    const metrics = this.state.metrics

    if (loading) {
      return (
        <div className='dashboard-spinner-container'>
          <LoadingSpinner />
        </div>
      )
    } else {
      return (
        <div className='dashboard'>
          <div className='dashboard-main-container'>
            <div className='dashboard-header'>
              <PatientCount
                pinnedCount={metrics.PinnedClaimsCount}
                totalCount={metrics.TotalClaimsCount}
              />
              <ViewSwitcher
                cardExpanded={cardExpanded}
                cardLayout={cardLayout}
                toggleCardExpanded={this.toggleCardExpanded}
                toggleCardLayout={this.toggleCardLayout}
              />
            </div>
            <div className='dashboard-body'>
              {
                claims.map((claim) => {
                  if (claim.PinnedStatus === true) {
                    return (
                      <PatientCard
                        numActions='5'
                        layout={cardLayout}
                        expanded={cardExpanded}
                        claim={claim}
                        updatePinnedStatus={this.updatePinnedStatus}
                        key={claim.ClaimSystemId}
                      />
                    )
                  }
                })
              }
            </div>
          </div>
          <div className='dashboard-side-panel'>
            <AppointmentCalendar
              appointmentDays={this.state.appointments}
              getMoreAppointments={this.getMoreAppointments}
            />
          </div>
        </div>
      )
    }
  }
}
