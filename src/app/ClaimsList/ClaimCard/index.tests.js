import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import ClaimCard from './index.js'
import Pin from '../../../theme/icons/Pin-1.svg'
import Unpin from '../../../theme/icons/Unpin-1.svg'

describe('Claim Card component', function () {
  it('has the correct icons', function () {
    const claimPinned = {
      IsPinned: true,
      ClaimNumber: 'WC10003',
      PatientFirstName: 'Don',
      PatientLastName: 'Draper',
      DOB: '1973-02-22T00:00:00.000Z',
      DOI: '2016-04-19T00:00:00.000Z'
    }

    const claimUnpinned = {
      IsPinned: false,
      ClaimNumber: 'WC10003',
      PatientFirstName: 'Don',
      PatientLastName: 'Draper',
      DOB: '1973-02-22T00:00:00.000Z',
      DOI: '2016-04-19T00:00:00.000Z'
    }

    expect(shallow(<ClaimCard claim={claimPinned} />).find(Pin).length).to.equal(1)
    expect(shallow(<ClaimCard claim={claimUnpinned} />).find(Unpin).length).to.equal(1)
  })

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

  // TODO: CF 12/05/2016: Add a test for onClick function when function is implemented”
})
