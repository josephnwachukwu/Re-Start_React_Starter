import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import PatientActionCard from './index.js'

import Diagnostics from '../../../theme/icons/Diagnostics.svg'
import Pending from '../../../theme/icons/Status-Pending.svg'

describe('Patient Action Card component', function () {
  it('has the correct transformations', function () {
    const patientAction = {
      ProductLine: 'DIAGNOSTICS',
      ServiceType: 'STANDARD',
      Status: 'PENDING',
      StatusDetail: null,
      ActionTitle: 'Language Appointment',
      ActionDate: '2016-12-05 T00:00:00.000Z',
      ActionDetail: [
        {
          Name: 'Service Type',
          Value: 'In-person Standard'
        },
        {
          Name: 'Language Type',
          Value: 'German'
        },
        {
          Name: 'Appointment Details',
          Value: 'Doctor'
        },
        {
          Name: 'Location Details',
          Value: '1111 Wynnton Road\nColumbus, GA 12345'
        },
        {
          Name: 'Service Date',
          Value: '8/18/2016 12:30 PM'
        }
      ]
    }

    const component = shallow(<PatientActionCard action={patientAction} />)
    expect(component.find('.action-card__tag').text()).to.equal('PENDING')
    expect(component.find('.action-card__month').text()).to.equal('DEC')
    expect(component.find('.action-card__day').text()).to.equal('5')
  })

  it('has the correct status icon', function () {
    const patientAction = {
      ProductLine: 'DIAGNOSTICS',
      ServiceType: 'STANDARD',
      Status: 'PENDING',
      StatusDetail: null,
      ActionTitle: 'Language Appointment',
      ActionDate: '2016-12-05 T00:00:00.000Z',
      ActionDetail: [
        {
          Name: 'Service Type',
          Value: 'In-person Standard'
        },
        {
          Name: 'Language Type',
          Value: 'German'
        },
        {
          Name: 'Appointment Details',
          Value: 'Doctor'
        },
        {
          Name: 'Location Details',
          Value: '1111 Wynnton Road\nColumbus, GA 12345'
        },
        {
          Name: 'Service Date',
          Value: '8/18/2016 12:30 PM'
        }
      ]
    }

    expect(shallow(<PatientActionCard action={patientAction} />).find(Pending).length).to.equal(1)
  })

  it('has the correct icon', function () {
    const patientAction = {
      ProductLine: 'DIAGNOSTICS',
      ServiceType: 'STANDARD',
      Status: 'PENDING',
      StatusDetail: null,
      ActionTitle: 'Language Appointment',
      ActionDate: '2016-12-05 T00:00:00.000Z',
      ActionDetail: [
        {
          Name: 'Service Type',
          Value: 'In-person Standard'
        },
        {
          Name: 'Language Type',
          Value: 'German'
        },
        {
          Name: 'Appointment Details',
          Value: 'Doctor'
        },
        {
          Name: 'Location Details',
          Value: '1111 Wynnton Road\nColumbus, GA 12345'
        },
        {
          Name: 'Service Date',
          Value: '8/18/2016 12:30 PM'
        }
      ]
    }

    expect(shallow(<PatientActionCard action={patientAction} />).find(Diagnostics).length).to.equal(1)
  })

  it('has working dropdown functionality', function () {
    const patientAction = {
      ProductLine: 'DIAGNOSTICS',
      ServiceType: 'STANDARD',
      Status: 'PENDING',
      StatusDetail: null,
      ActionTitle: 'Language Appointment',
      ActionDate: '2016-12-05 T00:00:00.000Z',
      ActionDetail: [
        {
          Name: 'Service Type',
          Value: 'In-person Standard'
        },
        {
          Name: 'Language Type',
          Value: 'German'
        },
        {
          Name: 'Appointment Details',
          Value: 'Doctor'
        },
        {
          Name: 'Location Details',
          Value: '1111 Wynnton Road\nColumbus, GA 12345'
        },
        {
          Name: 'Service Date',
          Value: '8/18/2016 12:30 PM'
        }
      ]
    }

    const component = shallow(<PatientActionCard action={patientAction} />)
    component.find('.action-card__button').simulate('click')
    expect(component.state('dropdownActive')).to.equal(true)
    expect(component.find('.action-card__dropdown').length).to.equal(1)
  })
})
