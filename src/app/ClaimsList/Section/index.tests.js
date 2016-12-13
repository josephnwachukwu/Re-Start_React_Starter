import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import Section from './index.js'

describe('Section component', function () {
  it('has the expected number of cards', function () {
    const claims = [
      {key: 0, card: {pinned: true, number: 'WC12312234234', name: 'Mitchelson, Sam', birthday: '01/01/1980', injuryDate: '01/01/2016'}},
      {key: 1, card: {pinned: true, number: 'WC12312234234', name: 'Guy, Justin', birthday: '01/01/1980', injuryDate: '01/01/2016'}},
      {key: 2, card: {pinned: true, number: 'WC12312234234', name: 'Russel, Nathan', birthday: '01/01/1980', injuryDate: '01/01/2016'}},
      {key: 3, card: {pinned: true, number: 'WC12312234234', name: 'Miller, Helen', birthday: '01/01/1980', injuryDate: '01/01/2016'}}
    ]
    expect(mount(
      <Section
        title='Pinned'
        claims={claims}
      />).find('.claim-card').length).to.equal(4)
  })

  it('shows the correct text when section is empty', function () {
    const noClaims = []
    const wrapper = mount(
      <Section
        title='J'
        claims={noClaims}
      />
    )
    expect(wrapper.props().claims.length = 0)
    expect(wrapper.props().emptySectionTitleText).to.be.defined
  })
})
