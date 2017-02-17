import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'

import Checkboxes from '.'

describe('Checkboxes component', function () {
  it('should set the selection when passed by parent', function () {
    const options = [
      { Index: 0, Value: 'Pizza' },
      { Index: 1, Value: 'Hot Dogs' },
      { Index: 2, Value: 'Steak' },
      { Index: 3, Value: 'Cake' },
      { Index: 4, Value: 'Hamburger' }
    ]

    const expectedSelectionIndices = [0, 2, 4]

    const component = shallow(
      <Checkboxes
        options={options}
        status=''
        selection={expectedSelectionIndices}
        onChange={() => {}}
        label='Favorite Food'
      />
    )

    const labels = component.find('.checkboxes__checkbox-label')

    expect(component.state('selection')).to.equal(expectedSelectionIndices)

    expectedSelectionIndices.forEach(expectedSelectionIndex => {
      const label = labels.at(expectedSelectionIndex)
      expect(label.find('.checkbox__selected').exists()).to.equal(true)
    })
  })

  it('should render visual error feedback when status is error', function () {
    const options = [
      { Index: 0, Value: 'Pizza' },
      { Index: 1, Value: 'Hot Dogs' },
      { Index: 2, Value: 'Steak' },
      { Index: 3, Value: 'Cake' }
    ]

    const errorMessage = 'Your Favorite Food is Required'

    const component = mount(
      <Checkboxes
        options={options}
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
    const options = [
      { Index: 0, Value: 'Pizza' },
      { Index: 1, Value: 'Hot Dogs' },
      { Index: 2, Value: 'Steak' },
      { Index: 3, Value: 'Cake' }
    ]

    const errorMessage = 'Your Favorite Food is Required'

    const component = mount(
      <Checkboxes
        options={options}
        status=''
        onChange={() => {}}
        label='Favorite Food'
        errorMessage={errorMessage}
      />
    )

    expect(component.find('.error-text').exists()).to.equal(false)
    expect(component.find('.error-border').exists()).to.equal(false)
    expect(component.find('.error-message').exists()).to.equal(false)
  })

  it('should render all options correctly', function () {
    const options = [
      { Index: 0, Value: 'Pizza' },
      { Index: 1, Value: 'Hot Dogs' },
      { Index: 2, Value: 'Steak' },
      { Index: 3, Value: 'Cake' }
    ]

    const expectedSelectionIndices = [0, 2]

    const component = mount(
      <Checkboxes
        options={options}
        status=''
        selection={expectedSelectionIndices}
        onChange={() => {}}
        label='Favorite Food'
      />
    )

    const optionCount = options.length

    const labels = component.find('.checkboxes__checkbox-label')
    const inputs = component.find('.checkbox__input')

    expect(labels).to.have.length(optionCount)
    expect(inputs).to.have.length(optionCount)

    options.forEach((option, index) => {
      const label = labels.at(index)
      const isOptionSelected = (expectedSelectionIndices.indexOf(option.Index) !== -1)
      expect(label.find('.checkbox__selected').exists()).to.equal(isOptionSelected)
      expect(label.find('.checkbox__label-text').text()).to.equal(option.Value)
    })
  })

  it('should call onChange with an array of the indices of the selected options', function () {
    const options = [
      { Index: 0, Value: 'Pizza' },
      { Index: 1, Value: 'Hot Dogs' },
      { Index: 2, Value: 'Steak' },
      { Index: 3, Value: 'Cake' }
    ]

    const onChange = sinon.stub()

    const component = mount(
      <Checkboxes
        options={options}
        status=''
        selection={[3]}
        onChange={onChange}
        label='Favorite Food'
      />
    )

    const inputs = component.find('.checkbox__input')

    const makeSelection = expectedSelectionIndex => {
      const simulatedEvent = {
        target: {
          value: options[expectedSelectionIndex].Index,
          checked: true
        }
      }

      inputs.at(expectedSelectionIndex).simulate('change', simulatedEvent)
    }

    const clearSelection = expectedSelectionIndex => {
      const simulatedEvent = {
        target: {
          value: options[expectedSelectionIndex].Index,
          checked: false
        }
      }

      inputs.at(expectedSelectionIndex).simulate('change', simulatedEvent)
    }

    makeSelection(0)
    expect(onChange.callCount).to.equal(1)
    expect(onChange.firstCall.args[0]).to.deep.equal([3, 0])

    makeSelection(2)
    expect(onChange.callCount).to.equal(2)
    expect(onChange.secondCall.args[0]).to.deep.equal([3, 0, 2])

    clearSelection(0)
    expect(onChange.callCount).to.equal(3)
    expect(onChange.thirdCall.args[0]).to.deep.equal([3, 2])
  })
})
