import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import format from 'date-fns/format'
import isSameDay from 'date-fns/is_same_day'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'

import { stripTimezone } from '../../Shared/Utils'

import LeftArrow from '../../../theme/icons/Calendar-Arrow-Left.svg'
import RightArrow from '../../../theme/icons/Calendar-Arrow-Right.svg'

import Canceled from '../../../theme/icons/Status-Canceled.svg'
import Completed from '../../../theme/icons/Status-Completed.svg'
import Missed from '../../../theme/icons/Status-Missed.svg'
import Pending from '../../../theme/icons/Status-Pending.svg'
import Processing from '../../../theme/icons/Status-Processing.svg'
import Submitted from '../../../theme/icons/Status-Submitted.svg'

import LoadingSpinner from '../../../theme/spinners/ring-alt-loader.svg'

import './index.css'

export default class AppointmentCalendar extends Component {
  constructor (props) {
    super(props)

    this.renderDayTabs = this.renderDayTabs.bind(this)
    this.renderContent = this.renderContent.bind(this)
    this.calcInitialActiveDay = this.calcInitialActiveDay.bind(this)
    this.updateActiveDay = this.updateActiveDay.bind(this)
    this.stripTimezoneFromAppointmentDays = this.stripTimezoneFromAppointmentDays.bind(this)
    this.getMoreAppointments = this.getMoreAppointments.bind(this)

    // Strip timezone from appointmentDays dates
    // and figure out the initial active day
    const appointmentDays = this.stripTimezoneFromAppointmentDays(this.props.appointmentDays)
    const initialActiveDay = this.calcInitialActiveDay(appointmentDays)
    this.state = {
      activeDay: initialActiveDay,
      appointmentDays: appointmentDays,
      loading: false
    }
  }

  componentWillReceiveProps (newProps) {
    if (!_.isEqual(this.props.appointmentDays, newProps.appointmentDays)) {
      const appointmentDays = this.stripTimezoneFromAppointmentDays(newProps.appointmentDays)
      const initialActiveDay = this.calcInitialActiveDay(appointmentDays)
      this.setState({
        activeDay: initialActiveDay,
        appointmentDays: appointmentDays
      })
    }
  }

  calcInitialActiveDay (appointmentDays = [{Date: ''}]) {
    let currentDay = stripTimezone((new Date()).toISOString())
    const currentDayIsInChunk = _.some(appointmentDays, (day) => {
      if (isSameDay(currentDay, day.Date)) {
        currentDay = day.Date
        return true
      } else {
        return false
      }
    })
    return (currentDayIsInChunk) ? currentDay : appointmentDays[0].Date
  }

  stripTimezoneFromAppointmentDays (appointmentDays) {
    return _.map(appointmentDays, (day) => {
      let stripedDay = day
      stripedDay.Date = stripTimezone(day.Date)
      return stripedDay
    })
  }

  updateActiveDay (day) {
    this.setState({
      activeDay: day.date
    })
  }

  getStatusIcon (status) {
    switch (status) {
      case 'Completed': return <Completed />
      case 'Submitted': return <Submitted />
      case 'Pending': return <Pending />
      case 'Processed': return <Processing />
      case 'Canceled': return <Canceled />
      case 'Missed': return <Missed />
      default: return ''
    }
  }

  getMoreAppointments (week = 'prev') {
    const currentActiveDay = this.state.activeDay
    let newActiveDay

    if (week === 'prev') {
      newActiveDay = subDays(currentActiveDay, 7)
    } else {
      newActiveDay = addDays(currentActiveDay, 7)
    }

    this.setState(
      { loading: true },
      () => {
        this.props.getMoreAppointments(week)
          .then(() => {
            this.setState({
              loading: false,
              activeDay: newActiveDay.toISOString()
            })
          })
      }
    )
  }

  renderDayTabs () {
    let formatedDays = _.map(this.state.appointmentDays, (day) => {
      return {
        date: day.Date,
        dayOfWeek: format(day.Date, 'ddd'),
        dayOfMonth: format(day.Date, 'DD'),
        hasAppointments: day.Claims.length > 0
      }
    })

    return (
      formatedDays.map((day) => {
        const isActiveDay = isSameDay(day.date, this.state.activeDay)

        let extraTabClass = ''
        let extraIndicatorClass = ''

        if (isActiveDay) {
          extraTabClass = extraTabClass.concat(' ', 'appointment-calendar__day-tab--active')

          if (day.hasAppointments) {
            extraIndicatorClass = extraIndicatorClass.concat(' ', 'appointment-calendar-indicator--active')
          }
        }
        if (day.hasAppointments) {
          extraIndicatorClass = extraIndicatorClass.concat(' ', 'appointment-calendar-indicator--present')
        }

        return (
          <div
            key={`${day.dayOfWeek}_${day.dayOfMonth}`}
            className={`appointment-calendar__day-tab ${extraTabClass}`}
            onClick={() => { this.updateActiveDay(day) }}>
            <div className='appointment-calendar__day-of-week'>
              {day.dayOfWeek}
            </div>
            <div className='appointment-calendar__day-of-month'>
              {day.dayOfMonth}
            </div>
            <div className={`appointment-calendar-indicator ${extraIndicatorClass}`} />
          </div>
        )
      })
    )
  }

  renderContent () {
    const activeDay = _.find(this.state.appointmentDays, { Date: this.state.activeDay })

    if (activeDay.Claims.length > 0) {
      return (
        activeDay.Claims.map((claim) => {
          const patientName = `${claim.PatientFirstName} ${claim.PatientLastName}`
          return (
            <div
              key={claim.ClaimSystemId}
              className='appointment-calendar__claim'>
              <div className='appointment-calendar__claim-header'>
                <div className='appointment-calendar__claim-title'>{patientName}</div>
                <div className='appointment-calendar__claim-number'>{claim.ClaimNumber}</div>
              </div>
              {
                claim.Appointments.map((appointment, index) => {
                  return (
                    <div
                      key={`${claim.ClaimSystemId}_${index}`}
                      className='appointment-calendar__appointment'>
                      <div className='appointment-calendar__status-icon'>
                        {this.getStatusIcon(appointment.Status)}
                      </div>
                      <div className='appointment-calendar__vertical-seperator' />
                      <div className='appointment-calendar__appointment-content'>
                        <div className='appointment-calendar__appointment-title'>
                          {appointment.Title}
                        </div>
                        {
                          (appointment.Time) ? (
                            <div className='appointment-calendar__appointment-time'>
                              {appointment.Time}
                            </div>
                          ) : ''
                        }
                      </div>
                    </div>
                  )
                })
              }
              <div className='appointment-calendar__claim-seperator' />
            </div>
          )
        })
      )
    } else {
      return (
        <div>
          <div className='appointment-calendar__no-appointments-text'>No Appointments Today</div>
          <div className='appointment-calendar__claim-seperator' />
        </div>
      )
    }
  }

  render () {
    const isLoading = this.state.loading

    return (
      <div
        className='appointment-calendar'
        disabled={isLoading}>
        {
          (isLoading)
            ? (
              <div className='appointment-calendar-loading-spinner'>
                <LoadingSpinner />
              </div>
              )
            : ''
        }
        <div className='appointment-calendar__header'>
          <div
            className='appointment-calendar__previous-week-button'
            onClick={() => this.getMoreAppointments('prev')}
            disabled={isLoading}>
            <LeftArrow />
          </div>
          <div className='appointment-calendar__title'>Appointments</div>
          <div
            className='appointment-calendar__next-week-button'
            onClick={() => this.getMoreAppointments('next')}
            disabled={isLoading}>
            <RightArrow />
          </div>
        </div>
        <div className='appointment-calendar__day-tabs'>
          {this.renderDayTabs()}
        </div>
        <div className='appointment-calendar__content'>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}

AppointmentCalendar.propTypes = {
  appointmentDays: PropTypes.arrayOf(
    PropTypes.shape({
      Date: PropTypes.string.isRequired,
      Claims: PropTypes.arrayOf(
        PropTypes.shape({
          ClaimSystemId: PropTypes.string.isRequired,
          AdjusterId: PropTypes.string.isRequired,
          ClaimNumber: PropTypes.string.isRequired,
          PatientFirstName: PropTypes.string.isRequired,
          PatientLastName: PropTypes.string.isRequired,
          Appointments: PropTypes.arrayOf(
            PropTypes.shape({
              Title: PropTypes.string.isRequired,
              Time: PropTypes.string.isRequired,
              Status: PropTypes.string.isRequired
            })
          ).isRequired
        })
      ).isRequired
    })
  ).isRequired,
  getMoreAppointments: PropTypes.func.isRequired
}
