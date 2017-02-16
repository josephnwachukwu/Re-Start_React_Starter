import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import RadioButtons from '.'

describe('RadioButtons component', function () {
  it('should set the selection when passed by parent', function () {
    const radioOptions = [
      { Index: 0, Value: 'Pizza' },
      { Index: 1, Value: 'Hot Dogs' },
      { Index: 2, Value: 'Steak' },
      { Index: 3, Value: 'Cake' }
    ]

    const expectedSelectionIndex = 3

    const component = shallow(
      <RadioButtons
        options={radioOptions}
        status=''
        selection={expectedSelectionIndex}
        onChange={() => {}}
        label='Favorite Food'
      />
    )

    const labels = component.find('.radio-buttons__radio-button-label')
    const label = labels.at(expectedSelectionIndex)

    expect(component.state('selection')).to.equal(expectedSelectionIndex)
    expect(label.find('.radio-button__selected').exists()).to.equal(true)
  })

  it('should render visual error feedback when status is error', function () {
    const radioOptions = [
      { Index: 0, Value: 'Pizza' },
      { Index: 1, Value: 'Hot Dogs' },
      { Index: 2, Value: 'Steak' },
      { Index: 3, Value: 'Cake' }
    ]

    const errorMessage = 'Your Favorite Food is Required'

    const component = mount(
      <RadioButtons
        options={radioOptions}
        status='error'
        onChange={() => {}}
        label='Favorite Food'
        errorMessage={errorMessage}
      />
    )

    expect(component.find('.error-text').exists()).to.equal(true)
    expect(component.find('.error-border').exists()).to.equal(true)
    expect(component.find('.error-message').text()).to.have.string(errorMessage)
  })

  it('should not render visual error feedback when status is empty', function () {
    const radioOptions = [
      { Index: 0, Value: 'Pizza' },
      { Index: 1, Value: 'Hot Dogs' },
      { Index: 2, Value: 'Steak' },
      { Index: 3, Value: 'Cake' }
    ]

    const component = shallow(
      <RadioButtons
        options={radioOptions}
        status=''
        onChange={() => {}}
        label='Favorite Food'
      />
    )

    expect(component.find('.error-text').exists()).to.equal(false)
    expect(component.find('.error-border').exists()).to.equal(false)
  })

  it('should render all options correctly', function () {
    const radioOptions = [
      { Index: 0, Value: 'Pizza' },
      { Index: 1, Value: 'Hot Dogs' },
      { Index: 2, Value: 'Steak' },
      { Index: 3, Value: 'Cake' }
    ]

    const expectedSelectionIndex = 2

    const component = shallow(
      <RadioButtons
        options={radioOptions}
        status=''
        selection={expectedSelectionIndex}
        onChange={() => {}}
        label='Favorite Food'
      />
    )

    const optionCount = radioOptions.length

    const labels = component.find('.radio-buttons__radio-button-label')
    const inputs = component.find('.radio-button__input')

    expect(labels).to.have.length(optionCount)
    expect(inputs).to.have.length(optionCount)

    radioOptions.forEach((option, index) => {
      const label = labels.at(index)
      const isOptionSelected = (option.Index === expectedSelectionIndex)
      expect(label.find('.radio-button__selected').exists()).to.equal(isOptionSelected)
      expect(label.find('.radio-button__label-text').text()).to.equal(option.Value)
    })
  })

  it('should call onChange with the index of the selected option', function () {
    const radioOptions = [
      { Index: 0, Value: 'Pizza' },
      { Index: 1, Value: 'Hot Dogs' },
      { Index: 2, Value: 'Steak' },
      { Index: 3, Value: 'Cake' }
    ]

    const onChange = sinon.stub()

    const component = mount(
      <RadioButtons
        options={radioOptions}
        status=''
        onChange={onChange}
        label='Favorite Food'
      />
    )

    const inputs = component.find('.radio-button__input')

    radioOptions.forEach((option, index) => {
      onChange.reset()

      const simulatedEvent = {
        target: {
          value: option.Index
        }
      }

      inputs.at(index).simulate('change', simulatedEvent)

      expect(onChange.callCount).to.equal(1)
      expect(onChange.firstCall.calledWith(option.Index)).to.equal(true)
    })
  })
})
