import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import format from 'date-fns/format'

import { stripTimezone } from '../../Shared/Utils'

import Canceled from '../../../theme/icons/Status-Canceled.svg'
import Completed from '../../../theme/icons/Status-Completed.svg'
import Missed from '../../../theme/icons/Status-Missed.svg'
import Pending from '../../../theme/icons/Status-Pending.svg'
import Processing from '../../../theme/icons/Status-Processing.svg'
import Submitted from '../../../theme/icons/Status-Submitted.svg'

import AppointmentCalendar from './index.js'

describe('AppointmentCalendar Component', function () {
  it('on mount should strip timezone information from the appointment days and set the initial active day', function () {
    const appointmentDays = [
      {
        Date: '',
        Claims: []
      }
    ]
    const spyStripTimezoneFromAppointmentDays = sinon.stub().returns(appointmentDays)
    const spyCalcInitialActiveDay = sinon.stub().returns('')

    // backup AppointmentCalendar prototype methods before overwritting them
    // because we don't want to polute other specs
    const backupStripTimezoneFromAppointmentDays = AppointmentCalendar.prototype.stripTimezoneFromAppointmentDays
    const backupCalcInitialActiveDay = AppointmentCalendar.prototype.calcInitialActiveDay
    AppointmentCalendar.prototype.stripTimezoneFromAppointmentDays = spyStripTimezoneFromAppointmentDays
    AppointmentCalendar.prototype.calcInitialActiveDay = spyCalcInitialActiveDay

    shallow(
      <AppointmentCalendar
        appointmentDays={appointmentDays}
        getMoreAppointments={() => {}}
      />
    )

    expect(spyStripTimezoneFromAppointmentDays.called).to.equal(true)
    expect(spyCalcInitialActiveDay.called).to.equal(true)

    // restore original AppointmentCalendar prototype methods
    AppointmentCalendar.prototype.stripTimezoneFromAppointmentDays = backupStripTimezoneFromAppointmentDays
    AppointmentCalendar.prototype.calcInitialActiveDay = backupCalcInitialActiveDay
  })

  it('on updated props should strip timezone information from the appointment days and set the initial active day', function () {
    const appointmentDays = [
      {
        Date: '',
        Claims: []
      }
    ]
    const spyStripTimezoneFromAppointmentDays = sinon.stub().returns(appointmentDays)
    const spyCalcInitialActiveDay = sinon.stub().returns('')

    // backup AppointmentCalendar prototype methods before overwritting them
    // because we don't want to polute other specs
    const backupStripTimezoneFromAppointmentDays = AppointmentCalendar.prototype.stripTimezoneFromAppointmentDays
    const backupCalcInitialActiveDay = AppointmentCalendar.prototype.calcInitialActiveDay
    AppointmentCalendar.prototype.stripTimezoneFromAppointmentDays = spyStripTimezoneFromAppointmentDays
    AppointmentCalendar.prototype.calcInitialActiveDay = spyCalcInitialActiveDay

    const appointmentCalendar = shallow(
      <AppointmentCalendar
        appointmentDays={appointmentDays}
        getMoreAppointments={() => {}}
      />
    )

    appointmentCalendar.setProps({
      appointmentDays: [
        {
          Date: '123',
          Claims: []
        }
      ]
    })

    expect(spyStripTimezoneFromAppointmentDays.callCount).to.equal(2)
    expect(spyCalcInitialActiveDay.callCount).to.equal(2)

    // restore original AppointmentCalendar prototype methods
    AppointmentCalendar.prototype.stripTimezoneFromAppointmentDays = backupStripTimezoneFromAppointmentDays
    AppointmentCalendar.prototype.calcInitialActiveDay = backupCalcInitialActiveDay
  })

  it('has a method which determines the initial active day', function () {
    // sets active day to today if current day is in appointmentDays chunk
    const today = stripTimezone((new Date()).toISOString())
    let appointmentDays = [
      {
        Date: '2017-01-21T00:00:00.000Z',
        Claims: []
      },
      {
        Date: today,
        Claims: []
      }
    ]

    let activeDay = AppointmentCalendar.prototype.calcInitialActiveDay(appointmentDays)
    expect(activeDay).to.equal(today)

    // sets activeDay to first day in the appointmentDays array if today is not in the appointmentDays chunk
    appointmentDays = [
      {
        Date: '2017-01-21T00:00:00.000Z',
        Claims: []
      },
      {
        Date: '2017-01-24T00:00:00.000Z',
        Claims: []
      }
    ]

    activeDay = AppointmentCalendar.prototype.calcInitialActiveDay(appointmentDays)
    expect(activeDay).to.equal(appointmentDays[0].Date)
  })

  it('has a method stripTimezoneFromAppointmentDays which strips the timezone off each appointment day date', function () {
    const inputAppointmentDays = [
      {
        Date: '2017-01-21T00:00:00.000Z',
        Claims: []
      },
      {
        Date: '2017-01-22T00:00:00.000Z',
        Claims: []
      }
    ]
    const expectedAppointmentDays = [
      {
        Date: stripTimezone('2017-01-21T00:00:00.000Z'),
        Claims: []
      },
      {
        Date: stripTimezone('2017-01-22T00:00:00.000Z'),
        Claims: []
      }
    ]

    const strippedTimezoneFromAppointmentDays = AppointmentCalendar.prototype.stripTimezoneFromAppointmentDays(inputAppointmentDays)

    expect(strippedTimezoneFromAppointmentDays[0].Date).to.equal(expectedAppointmentDays[0].Date)
    expect(strippedTimezoneFromAppointmentDays[1].Date).to.equal(expectedAppointmentDays[1].Date)
  })

  it('has a getStatus method that returns the expected icon based on the status type', function () {
    const appointmentDays = [
      {
        Date: (new Date()).toISOString(),
        Claims: [
          {
            'ClaimSystemId': 'f389d478-a64b-4693-b6ad-923bd6f24716',
            'AdjusterId': 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b',
            'ClaimNumber': 'WC10020',
            'PatientFirstName': 'Jon',
            'PatientLastName': 'Gerber',
            'Appointments': [
              {
                'Title': 'PLACEHOLDER Appointment',
                'Time': '6:00 AM',
                'Status': 'Completed'
              }
            ]
          },
          {
            'ClaimSystemId': 'f389d478-a64b-4693-b6ad-923bd6f24716',
            'AdjusterId': 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b',
            'ClaimNumber': 'WC10021',
            'PatientFirstName': 'Jon',
            'PatientLastName': 'Gerber',
            'Appointments': [
              {
                'Title': 'PLACEHOLDER Appointment',
                'Time': '6:00 AM',
                'Status': 'Submitted'
              }
            ]
          },
          {
            'ClaimSystemId': 'f389d478-a64b-4693-b6ad-923bd6f24716',
            'AdjusterId': 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b',
            'ClaimNumber': 'WC10022',
            'PatientFirstName': 'Jon',
            'PatientLastName': 'Gerber',
            'Appointments': [
              {
                'Title': 'PLACEHOLDER Appointment',
                'Time': '6:00 AM',
                'Status': 'Pending'
              }
            ]
          },
          {
            'ClaimSystemId': 'f389d478-a64b-4693-b6ad-923bd6f24716',
            'AdjusterId': 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b',
            'ClaimNumber': 'WC10023',
            'PatientFirstName': 'Jon',
            'PatientLastName': 'Gerber',
            'Appointments': [
              {
                'Title': 'PLACEHOLDER Appointment',
                'Time': '6:00 AM',
                'Status': 'Processed'
              }
            ]
          },
          {
            'ClaimSystemId': 'f389d478-a64b-4693-b6ad-923bd6f24716',
            'AdjusterId': 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b',
            'ClaimNumber': 'WC10024',
            'PatientFirstName': 'Jon',
            'PatientLastName': 'Gerber',
            'Appointments': [
              {
                'Title': 'PLACEHOLDER Appointment',
                'Time': '6:00 AM',
                'Status': 'Canceled'
              }
            ]
          },
          {
            'ClaimSystemId': 'f389d478-a64b-4693-b6ad-923bd6f24716',
            'AdjusterId': 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b',
            'ClaimNumber': 'WC10025',
            'PatientFirstName': 'Jon',
            'PatientLastName': 'Gerber',
            'Appointments': [
              {
                'Title': 'PLACEHOLDER Appointment',
                'Time': '6:00 AM',
                'Status': 'Missed'
              }
            ]
          },
          {
            'ClaimSystemId': 'f389d478-a64b-4693-b6ad-923bd6f24716',
            'AdjusterId': 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b',
            'ClaimNumber': 'WC10026',
            'PatientFirstName': 'Jon',
            'PatientLastName': 'Gerber',
            'Appointments': [
              {
                'Title': 'PLACEHOLDER Appointment',
                'Time': '6:00 AM',
                'Status': 'Unexpected'
              }
            ]
          }
        ]
      }
    ]

    const appointmentCalendar = shallow(
      <AppointmentCalendar
        appointmentDays={appointmentDays}
        getMoreAppointments={() => {}}
      />
    )

    expect(appointmentCalendar.find(Completed).length).to.equal(1)
    expect(appointmentCalendar.find(Submitted).length).to.equal(1)
    expect(appointmentCalendar.find(Pending).length).to.equal(1)
    expect(appointmentCalendar.find(Processing).length).to.equal(1)
    expect(appointmentCalendar.find(Canceled).length).to.equal(1)
    expect(appointmentCalendar.find(Missed).length).to.equal(1)
  })

  it('has a getMoreAppointments method that calls the prop getMoreAppointments method, toggles the loading state, and sets the new active day when called for the previous week', function (done) {
    const getMoreAppointments = sinon.stub().returns(Promise.resolve([]))

    const appointmentDays = [
      {
        Date: stripTimezone((new Date()).toISOString()),
        Claims: []
      }
    ]

    const appointmentCalendar = shallow(
      <AppointmentCalendar
        appointmentDays={appointmentDays}
        getMoreAppointments={getMoreAppointments}
      />
    )

    expect(appointmentCalendar.state().loading).to.equal(false)
    expect(appointmentCalendar.state().activeDay).to.equal(appointmentDays[0].Date)
    appointmentCalendar.instance().getMoreAppointments('prev')

    setImmediate(() => {
      expect(getMoreAppointments.calledWith('prev')).to.equal(true)
      expect(appointmentCalendar.state().activeDay).to.equal(subDays(appointmentDays[0].Date, 7).toISOString())
      done()
    })
  })

  it('has a getMoreAppointments method that calls the prop getMoreAppointments method, toggles the loading state, and sets the new active day when called for the next week', function (done) {
    const getMoreAppointments = sinon.stub().returns(Promise.resolve([]))

    const appointmentDays = [
      {
        Date: stripTimezone((new Date()).toISOString()),
        Claims: []
      }
    ]

    const appointmentCalendar = shallow(
      <AppointmentCalendar
        appointmentDays={appointmentDays}
        getMoreAppointments={getMoreAppointments}
      />
    )

    expect(appointmentCalendar.state().loading).to.equal(false)
    expect(appointmentCalendar.state().activeDay).to.equal(appointmentDays[0].Date)
    appointmentCalendar.instance().getMoreAppointments('next')

    setImmediate(() => {
      expect(getMoreAppointments.calledWith('next')).to.equal(true)
      expect(appointmentCalendar.state().activeDay).to.equal(addDays(appointmentDays[0].Date, 7).toISOString())
      done()
    })
  })

  it('on click of a next button calls the getMoreAppointments method with next as the parameter', function () {
    const getMoreAppointments = sinon.stub().returns(Promise.resolve([]))

    const appointmentDays = [
      {
        Date: stripTimezone((new Date()).toISOString()),
        Claims: []
      }
    ]

    const appointmentCalendar = shallow(
      <AppointmentCalendar
        appointmentDays={appointmentDays}
        getMoreAppointments={() => {}}
      />
    )

    appointmentCalendar.instance().getMoreAppointments = getMoreAppointments
    appointmentCalendar.find('.appointment-calendar__next-week-button').simulate('click')
    expect(getMoreAppointments.calledWith('next')).to.equal(true)

    appointmentCalendar.find('.appointment-calendar__previous-week-button').simulate('click')
    expect(getMoreAppointments.calledWith('prev')).to.equal(true)
  })

  it('correctly concats the patient name', function () {
    const appointmentDays = [
      {
        Date: stripTimezone((new Date()).toISOString()),
        Claims: [
          {
            'ClaimSystemId': 'f389d478-a64b-4693-b6ad-923bd6f24716',
            'AdjusterId': 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b',
            'ClaimNumber': 'WC10020',
            'PatientFirstName': 'Jon',
            'PatientLastName': 'Gerber',
            'Appointments': [
              {
                'Title': 'PLACEHOLDER Appointment',
                'Time': '6:00 AM',
                'Status': 'Completed'
              }
            ]
          }
        ]
      }
    ]

    const appointmentCalendar = shallow(
      <AppointmentCalendar
        appointmentDays={appointmentDays}
        getMoreAppointments={() => {}}
      />
    )

    expect(appointmentCalendar.find('.appointment-calendar__claim-title').text()).to.equal('Jon Gerber')
  })

  it('correctly sets the indicator class when the active day is today and has appointments', function () {
    const appointmentDays = [
      {
        Date: stripTimezone((new Date()).toISOString()),
        Claims: [
          {
            'ClaimSystemId': 'f389d478-a64b-4693-b6ad-923bd6f24716',
            'AdjusterId': 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b',
            'ClaimNumber': 'WC10020',
            'PatientFirstName': 'Jon',
            'PatientLastName': 'Gerber',
            'Appointments': [
              {
                'Title': 'PLACEHOLDER Appointment',
                'Time': '6:00 AM',
                'Status': 'Completed'
              }
            ]
          }
        ]
      }
    ]

    const appointmentCalendar = shallow(
      <AppointmentCalendar
        appointmentDays={appointmentDays}
        getMoreAppointments={() => {}}
      />
    )

    expect(appointmentCalendar.find('.appointment-calendar-indicator--active').length).to.equal(1)
  })

  it('correctly sets the indicator class when the active day has appointments but is not today', function () {
    const sevenDaysAgo = subDays((new Date()).toISOString(), 7).toISOString()
    const appointmentDays = [
      {
        Date: stripTimezone(sevenDaysAgo),
        Claims: [
          {
            'ClaimSystemId': 'f389d478-a64b-4693-b6ad-923bd6f24716',
            'AdjusterId': 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b',
            'ClaimNumber': 'WC10020',
            'PatientFirstName': 'Jon',
            'PatientLastName': 'Gerber',
            'Appointments': [
              {
                'Title': 'PLACEHOLDER Appointment',
                'Time': '6:00 AM',
                'Status': 'Completed'
              }
            ]
          }
        ]
      }
    ]

    const appointmentCalendar = shallow(
      <AppointmentCalendar
        appointmentDays={appointmentDays}
        getMoreAppointments={() => {}}
      />
    )

    expect(appointmentCalendar.find('.appointment-calendar-indicator--present').length).to.equal(1)
  })

  it('clicking a tab updates the active day', function () {
    const yesterday = stripTimezone('2017-01-21T00:00:00.000Z')
    const today = stripTimezone('2017-01-22T00:00:00.000Z')
    const appointmentDays = [
      {
        Date: yesterday,
        Claims: [
          {
            'ClaimSystemId': 'f389d478-a64b-4693-b6ad-923bd6f24716',
            'AdjusterId': 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b',
            'ClaimNumber': 'WC10020',
            'PatientFirstName': 'Jon',
            'PatientLastName': 'Gerber',
            'Appointments': [
              {
                'Title': 'PLACEHOLDER Appointment',
                'Time': '6:00 AM',
                'Status': 'Completed'
              }
            ]
          }
        ]
      },
      {
        Date: today,
        Claims: [
          {
            'ClaimSystemId': 'f389d478-a64b-4693-b6ad-923bd6f24716',
            'AdjusterId': 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b',
            'ClaimNumber': 'WC10021',
            'PatientFirstName': 'Diego',
            'PatientLastName': 'Concha',
            'Appointments': [
              {
                'Title': 'Physical Therapy',
                'Time': '10:00 AM',
                'Status': 'Completed'
              }
            ]
          }
        ]
      }
    ]

    const appointmentCalendar = shallow(
      <AppointmentCalendar
        appointmentDays={appointmentDays}
        getMoreAppointments={() => {}}
      />
    )

    const dayOfWeek = format(today, 'ddd')
    const dayOfMonth = format(today, 'DD')

    appointmentCalendar.find(`.appointment-calendar__day-tab-${dayOfWeek}_${dayOfMonth}`).simulate('click')

    expect(appointmentCalendar.find('.appointment-calendar__claim-title').text()).to.equal('Diego Concha')
    expect(appointmentCalendar.find('.appointment-calendar__appointment-title').text()).to.equal('Physical Therapy')
  })
})
