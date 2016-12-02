import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import ClaimCard from './index.js'
import Pin from '../../../theme/icons/Pin-1.svg'

function onClick () {
  alert('ClaimCard Clicked')
}

const claim = {
  IsPinned: true,
  ClaimNumber: 'WC10003',
  PatientFirstName: 'Don',
  PatientLastName: 'Draper',
  DOB: '1973-02-22T00:00:00.000Z',
  DOI: '2016-04-19T00:00:00.000Z'
}

describe('Claim Card component', function () {
  it('has an icon', function () {
    expect(shallow(<ClaimCard claim={claim} onClick={onClick} />).find(Pin).length).to.equal(1)
  })

  it('has the correct DOB and DOI', function () {
    const claimCard = shallow(<ClaimCard claim={claim} onClick={onClick} />)

    expect(claimCard.state().DOB).to.equal('02/21/1973')
    expect(claimCard.state().DOI).to.equal('04/18/2016')
  })

  it('has the correct name', function () {
    expect(shallow(<ClaimCard claim={claim} onClick={onClick} />).state().name).to.equal('Draper, Don')
  })

  it('has an onClick function', function () {
    expect(shallow(<ClaimCard claim={claim} onClick={onClick} />).props().onClick).to.equal(onClick)
  })
})
