import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'

import DatePicker from './index.js'

describe('DatePicker Component', function () {
  it('has label when label is available', function () {
    const wrapper = shallow(
      <DatePicker
        label='joseph'
        selection=''
        onChange={(v) => { console.log(v) }}
      />
    )

    expect(wrapper.find('.date-picker__label').text()).to.equal('joseph')
  })

  it('has a default date when one is available', function () {
    const wrapper = mount(<DatePicker selection='1985-01-11' />)
    const input = wrapper.find('input')

    expect(input.get(0).value).to.equal('01 / 11 / 1985')
  })

  it('has time when time is enabled', function () {
    const wrapper = mount(
      <DatePicker
        enableTime
        selection='1985-01-11 00:00'
        onChange={(v) => { console.log(v) }}
      />
    )

    const input = wrapper.find('input')

    expect(input.get(0).value).to.equal('01 / 11 / 1985   |   12:00')
  })
})
