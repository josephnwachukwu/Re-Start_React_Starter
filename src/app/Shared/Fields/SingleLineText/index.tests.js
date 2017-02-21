import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import SingleLineText from './index.js'

describe('Single Line Text Component', function () {
  it('has label when label is available', function () {
    const wrapper = shallow(
      <SingleLineText
        label='joseph'
        onChange={(v) => { console.log(v) }}
        selection=''
      />
    )

    expect(wrapper.find('.single-line-text__label').text()).to.equal('joseph')
  })

  it('has a default value when one is available', function () {
    const wrapper = mount(
      <SingleLineText
        selection='Joseph Nwachukwu'
        onChange={(v) => { console.log(v) }}
      />
    )

    const input = wrapper.find('input')

    expect(input.get(0).value).to.equal('Joseph Nwachukwu')
  })

  it('should call onChange prop on change of the selected value', function () {
    const onChange = sinon.stub()

    const wrapper = mount(
      <SingleLineText
        selection='joseph'
        onChange={onChange}
      />
    )

    const input = wrapper.find('input')
    input.simulate('focus')
    input.simulate('change', {target: {value: 'test'}})

    expect(onChange.getCall(0).calledWith('test')).to.equal(true)
  })
})
