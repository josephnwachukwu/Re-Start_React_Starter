import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import PatientCard from './index.js'
import PatientActionCard from '../../Shared/PatientActionCard'

describe('Patient Card component', function () {
  it('has the correct patient name', function () {
    const patientAction = {
      ActionId: '1'
    }
    const claim = {
      PatientFirstName: 'John',
      PatientLastName: 'Smith',
      ClaimNumber: 'WC10050',
      PinnedStatus: false,
      Actions: [patientAction]
    }

    expect(shallow(
      <PatientCard
        numActions='3'
        layout='row'
        expanded={false}
        claim={claim}
      />
    ).find('.patient-card--row__name').text()).to.equal('John Smith')
  })

  it('expands when clicked', function () {
    const patientAction = {
      ActionId: '1'
    }
    const claim = {
      PatientFirstName: 'John',
      PatientLastName: 'Smith',
      ClaimNumber: 'WC10050',
      PinnedStatus: false,
      Actions: [patientAction]
    }

    const patientCard = shallow(
      <PatientCard
        numActions='3'
        layout='row'
        expanded={false}
        claim={claim}
      />
    )

    patientCard.find('.patient-card--row__icon').simulate('click')
    expect(patientCard.state().expanded).to.equal(true)
  })

  it('has the expected number of cards', function () {
    const patientActions = [
      {
        ActionId: '1'
      },
      {
        ActionId: '2'
      },
      {
        ActionId: '3'
      }
    ]
    const claim = {
      PatientFirstName: 'John',
      PatientLastName: 'Smith',
      ClaimNumber: 'WC10050',
      PinnedStatus: false,
      Actions: patientActions
    }

    const patientCard = shallow(
      <PatientCard
        numActions='3'
        layout='row'
        expanded
        claim={claim}
      />
    )

    expect(patientCard.find(PatientActionCard).length).to.equal(3)
  })

  it('it displays the correct layout', function () {
    const patientAction = {
      ActionId: '1'
    }
    const claim = {
      PatientFirstName: 'John',
      PatientLastName: 'Smith',
      ClaimNumber: 'WC10050',
      PinnedStatus: false,
      Actions: [patientAction]
    }

    expect(shallow(
      <PatientCard
        numActions='3'
        layout='col'
        expanded={false}
        claim={claim}
      />
    ).find('.patient-card--col').length).to.equal(1)
  })
})
