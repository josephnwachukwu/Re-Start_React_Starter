import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import ClaimCard from './index.js'

describe('Claim Card component', function () {
  it('has the correct DOB and DOI', function () {
    const claimPinned = {
      IsPinned: true,
      ClaimNumber: 'WC10003',
      PatientFirstName: 'Don',
      PatientLastName: 'Draper',
      DOB: '1954-12-07T00:00:00Z',
      DOI: '2016-12-01T00:00:00Z'
    }

    const claimCard = shallow(<ClaimCard claim={claimPinned} />)

    expect(claimCard.find('.claim-card__birthday').text()).to.equal('12/07/1954')
    expect(claimCard.find('.claim-card__injury-date').text()).to.equal('12/01/2016')
  })

  it('has the correct name', function () {
    const claimPinned = {
      IsPinned: true,
      ClaimNumber: 'WC10003',
      PatientFirstName: 'Don',
      PatientLastName: 'Draper',
      DOB: '1973-02-22T00:00:00.000Z',
      DOI: '2016-04-19T00:00:00.000Z'
    }

    expect(shallow(<ClaimCard claim={claimPinned} />).find('.claim-card__name').text()).to.equal('Draper, Don')
  })

  it('redirects to the correct page when clicked', function () {
    const claimPinned = {
      IsPinned: true,
      ClaimNumber: 'WC10003',
      PatientFirstName: 'Don',
      PatientLastName: 'Draper',
      DOB: '1973-02-22T00:00:00.000Z',
      DOI: '2016-04-19T00:00:00.000Z'
    }

    const claimCard = shallow(<ClaimCard claim={claimPinned} />)
    expect(claimCard.find('.claim-card__link').props().to).to.equal('patientinfo?claimId=8ad71dff-5aac-4853-aa20-10ae169aff22')
  })
})
