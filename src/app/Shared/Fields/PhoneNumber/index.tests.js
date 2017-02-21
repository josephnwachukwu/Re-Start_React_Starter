import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'

import Phone from './index.js'

describe('Phone component', function () {
  it('has label when label is available', function () {
    const wrapper = shallow(
      <Phone
        label='joseph'
        onChange={(v) => { console.log(v) }}
        selection=''
      />
    )

    expect(wrapper.find('.phone-number__label').text()).to.equal('joseph')
  })

  it('has the expected phone number format', function () {
    const wrapper = mount(
      <Phone
        selection='1112223333'
        onChange={(v) => { console.log(v) }}
      />
    )
    const input = wrapper.find('input')

    expect(input.get(0).value).to.equal('(111) 222-3333')
  })
})
