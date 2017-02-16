import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import Numeric from '.'

describe('Numeric component', function () {
  it('should set the selection when passed by parent', function () {
    const expectedSelection = 15

    const component = mount(
      <Numeric
        label='Age * (between 10 and 50)'
        selection={expectedSelection}
        onChange={() => {}}
        status={''}
        validation={{}}
        placeholder='Enter Age'
        errorMessage='Invalid age entered.' />
    )

    expect(component.find('.numeric__input').get(0).value).to.equal(`${expectedSelection}`)
  })

  it('should render visual error feedback for invalid input', function () {
    const status = 'error'
    const validation = {}
    const errorMessage = 'Invalid age entered.'

    const component = mount(
      <Numeric
        label='Age * (between 10 and 50)'
        selection={5}
        onChange={() => {}}
        status={status}
        validation={validation}
        placeholder='Enter Age'
        errorMessage={errorMessage} />
    )

    expect(component.find('.error-text').exists()).to.equal(true)
    expect(component.find('.error-border').exists()).to.equal(true)
    expect(component.find('.error-message').text()).to.have.string(errorMessage)
  })

  it('should not render visual error feedback for valid input', function () {
    const status = ''
    const validation = {}
    const component = shallow(
      <Numeric
        label='Age * (between 10 and 50)'
        selection={10}
        onChange={() => {}}
        status={status}
        validation={validation}
        placeholder='Enter Age'
        errorMessage='Invalid age entered.' />
    )

    expect(component.find('.error-text').exists()).to.equal(false)
    expect(component.find('.error-border').exists()).to.equal(false)
  })

  it('should validate minimum value when requested', function () {
    const validation = {
      min: 10
    }

    const validationResult = {}
    const onChange = (data) => {
      validationResult.valid = data.valid
      validationResult.value = data.value
    }

    const validateMinimum = sinon.spy(Numeric.prototype, 'validateMinimum')

    const component = mount(
      <Numeric
        label='Age * (between 10 and 50)'
        selection={10}
        onChange={onChange}
        status=''
        validation={validation}
        placeholder='Enter Age'
        errorMessage='Invalid age entered.' />
    )

    const input = component.find('.numeric__input')

    const simulatedEvent = {
      target: {
        value: '5'
      }
    }

    input.simulate('change', simulatedEvent)

    expect(validateMinimum.called).to.equal(true)
    expect(validateMinimum.firstCall.calledWith(5, validation)).to.equal(true)
    expect(validationResult).to.deep.equal({
      valid: false,
      value: 5
    })

    simulatedEvent.target.value = '20'

    input.simulate('change', simulatedEvent)

    expect(validateMinimum.secondCall.calledWith(20, validation)).to.equal(true)
    expect(validationResult).to.deep.equal({
      valid: true,
      value: 20
    })

    validateMinimum.restore()
  })

  it('should validate maximum value when requested', function () {
    const validation = {
      max: 50
    }

    const validationResult = {}
    const onChange = (data) => {
      validationResult.valid = data.valid
      validationResult.value = data.value
    }

    const validateMaximum = sinon.spy(Numeric.prototype, 'validateMaximum')

    const component = mount(
      <Numeric
        label='Age * (between 10 and 50)'
        selection={10}
        onChange={onChange}
        status=''
        validation={validation}
        placeholder='Enter Age'
        errorMessage='Invalid age entered.' />
    )

    const input = component.find('.numeric__input')

    const simulatedEvent = {
      target: {
        value: '80'
      }
    }

    input.simulate('change', simulatedEvent)

    expect(validateMaximum.called).to.equal(true)
    expect(validateMaximum.firstCall.calledWith(80, validation)).to.equal(true)
    expect(validationResult).to.deep.equal({
      valid: false,
      value: 80
    })

    simulatedEvent.target.value = '20'

    input.simulate('change', simulatedEvent)

    expect(validateMaximum.secondCall.calledWith(20, validation)).to.equal(true)
    expect(validationResult).to.deep.equal({
      valid: true,
      value: 20
    })

    validateMaximum.restore()
  })

  it('should correctly call onChange with data', function () {
    const onChange = sinon.stub()
    const validation = {
      min: 10,
      max: 50
    }
    const component = mount(
      <Numeric
        label='Age * (between 10 and 50)'
        selection={10}
        onChange={onChange}
        status=''
        validation={validation}
        placeholder='Enter Age'
        errorMessage='Invalid age entered.' />
    )

    const input = component.find('.numeric__input')

    const simulatedEvent = {
      target: {
        value: '30'
      }
    }

    input.simulate('change', simulatedEvent)

    expect(onChange.called).to.equal(true)
    expect(onChange.firstCall.calledWith({
      valid: true,
      value: 30
    })).to.equal(true)

    simulatedEvent.target.value = 80

    input.simulate('change', simulatedEvent)

    expect(onChange.called).to.equal(true)
    expect(onChange.secondCall.calledWith({
      valid: false,
      value: 80
    })).to.equal(true)
  })
})
