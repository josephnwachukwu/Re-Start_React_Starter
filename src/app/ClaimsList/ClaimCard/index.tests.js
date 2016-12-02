import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import ClaimCard from './index.js'
import mockData from '../api/mockData.json'

function onClick () {
  alert('ClaimCard Clicked')
}

describe('Claim Card component', function () {
  it('has the correct DOB and DOI', function () {
    const claimCard = shallow(<ClaimCard claim={mockData.Payload[0]} onClick={onClick} />)

    expect(claimCard.state().DOB).to.equal('02/21/1973')
    expect(claimCard.state().DOI).to.equal('04/18/2016')
  })

  it('has the correct name', function () {
    expect(shallow(<ClaimCard claim={mockData.Payload[0]} onClick={onClick} />).state().name).to.equal('Draper, Don')
  })

  it('has an onClick function', function () {
    expect(shallow(<ClaimCard claim={mockData.Payload[0]} onClick={onClick} />).props().onClick).to.equal(onClick)
  })
})
