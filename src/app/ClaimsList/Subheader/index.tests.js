import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import Subheader from './index.js'

describe('Subheader component', function () {
  it('has a total number of active claims', function () {
    const mockClaimCount = 278
    const wrapper = mount(
      <Subheader claimCount={mockClaimCount} />
    )
    expect(wrapper.props().claimCount).to.be.defined
  })

  it('Should have a number equal to the number passed', function () {
    const mockClaimCount = 278
    const wrapper = mount(
      <Subheader claimCount={mockClaimCount} />
    )
    expect(wrapper.props().claimCount).to.equal(278)
  })
})
