import React, { Component } from 'react'
import _ from 'lodash'

import stripTimezone from '../Shared/Utils/stripTimezone'
import startOfWeek from 'date-fns/start_of_week'
import lastDayOfWeek from 'date-fns/last_day_of_week'
import format from 'date-fns/format'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'

import { getClaimActions, getMetrics, getAppointments, setPinnedStatus } from './Api'

import PatientCard from './PatientCard'
import ViewSwitcher from './ViewSwitcher'
import PatientCount from './PatientCount'
import UndoBar from '../Shared/UndoBar'
import AppointmentCalendar from './AppointmentCalendar'

import LoadingSpinner from '../../theme/spinners/Animation-Loader.svg'

import './index.css'

export default class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.toggleCardExpanded = this.toggleCardExpanded.bind(this)
    this.toggleCardLayout = this.toggleCardLayout.bind(this)
    this.updatePinnedStatus = this.updatePinnedStatus.bind(this)
    this.showUndoBar = this.showUndoBar.bind(this)
    this.undoPin = this.undoPin.bind(this)
    this.closeUndoBar = this.closeUndoBar.bind(this)
    this.getMoreAppointments = this.getMoreAppointments.bind(this)

    // TODO: DC 12-12-2016: Figure out where adjusterId will be coming from
    this.state = {
      claims: [],
      loading: true,
      cardExpanded: true,
      cardLayout: 'col',
      metrics: {
        pinnedClaimsCount: 0,
        totalClaimsCount: 0
      },
      undo: {
        lastClaimId: '',
        lastPinnedState: true,
        showUndo: false
      },
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
          metrics: {
            pinnedClaimsCount: response.Payload.PinnedClaimsCount,
            totalClaimsCount: response.Payload.TotalClaimsCount
          }
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

  showUndoBar () {
    const undoClaim = _.find(this.state.claims, (claim) => {
      return claim.ClaimSystemId === this.state.undo.lastClaimId
    })
    const undoPatientName = `${undoClaim.PatientFirstName} ${undoClaim.PatientLastName}`
    const undoLayoutClassName = (this.state.cardLayout === 'col') ? 'undo-bar-container--col-layout' : 'undo-bar-container--row-layout'

    return (
      <div className={`undo-bar-container ${undoLayoutClassName}`}>
        <UndoBar
          key={this.state.undo.lastClaimId}
          undoPatientName={undoPatientName}
          showUndo={this.state.undo.showUndo}
          undoAction={this.undoPin}
          closeUndoBar={this.closeUndoBar}
        />
      </div>
    )
  }

  undoPin () {
    return this.updatePinnedStatus(this.state.undo.lastClaimId, this.state.undo.lastPinnedState)
      .then(() => {
        this.closeUndoBar()
      })
  }

  closeUndoBar () {
    this.setState({
      undo: {
        showUndo: false,
        lastClaimId: '',
        lastPinnedState: true
      }
    })
  }

  updatePinnedStatus (claimId, newPinnedStatus) {
    const oldPinnedStatus = !newPinnedStatus

    // Set local claim pinnedStatus to newPinnedStatus
    let claims = this.state.claims

    for (let i = 0; i < claims.length; i++) {
      let claim = claims[i]
      if (claim.ClaimSystemId === claimId) {
        claim.PinnedStatus = newPinnedStatus
        break
      }
    }

    // Set remote pinnedStatus on the server
    return setPinnedStatus(claimId, newPinnedStatus)
      .then(() => {
        return getMetrics(this.state.adjusterId)
      })
      .then((response) => {
        return this.setState({
          undo: {
            lastClaimId: claimId,
            lastPinnedState: oldPinnedStatus,
            showUndo: true
          },
          metrics: {
            pinnedClaimsCount: response.Payload.PinnedClaimsCount,
            totalClaimsCount: response.Payload.TotalClaimsCount
          },
          claims
        })
      })
  }

  getMoreAppointments (week = 'prev') {
    const currentStartDate = stripTimezone(this.state.appointments[0].Date)
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
                pinnedCount={metrics.pinnedClaimsCount}
                totalCount={metrics.totalClaimsCount}
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
                  } else {
                    if (this.state.undo.showUndo) {
                      return this.showUndoBar()
                    }
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
