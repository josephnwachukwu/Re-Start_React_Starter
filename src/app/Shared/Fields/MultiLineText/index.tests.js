import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import MultiLineText from './index.js'

describe('Multi Line Text Component', function () {
  it('has label when label is available', function () {
    const multiLine = shallow(
      <MultiLineText
        label='joseph'
        selection=''
        onChange={(v) => { console.log(v) }}
      />
    )

    expect(multiLine.find('.multi-line-text__label').text()).to.equal('joseph')
  })

  it('has a default value when one is available', function () {
    const wrapper = mount(
      <MultiLineText
        selection='Joseph Nwachukwu'
        onChange={(v) => { console.log(v) }}
       />
    )
    const input = wrapper.find('textarea')

    expect(input.get(0).value).to.equal('Joseph Nwachukwu')
  })

  it('should change the value on change', function () {
    const onChange = sinon.stub()

    const wrapper = mount(
      <MultiLineText
        selection='joseph'
        onChange={onChange}
      />
    )
    const input = wrapper.find('textarea')
    input.simulate('focus')
    input.simulate('change', {target: {value: 'test'}})

    expect(onChange.getCall(0).calledWith('test')).to.equal(true)
  })
})
