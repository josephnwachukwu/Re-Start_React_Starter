import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import ErrorMessage from '.'

describe('ErrorMessage component', function () {
  it('should display message when specified', function () {
    const mainContainerClassName = '.error-message__main-container'
    const message = 'There is an error'
    const component = shallow(<ErrorMessage message={message} showError />)
    expect(component.find(mainContainerClassName).text()).to.equal(message)
  })

  it('should display children when specified', function () {
    const message = 'There is an error'
    const component = shallow(
      <ErrorMessage showError>
        <span className='error-icon' />
        <span className='message-text'>{message}</span>
        <button className='error-button'>Dismiss</button>
      </ErrorMessage>
    )
    expect(component.children()).to.have.length(3)
  })

  it('should have the correct class based on visibility', function () {
    const visibilitySetting = [true, false]

    visibilitySetting.forEach(visible => {
      let shouldHave = 'error-message'
      let shouldNotHave = 'error-message__no-error'

      if (!visible) {
        shouldHave = 'error-message__no-error'
        shouldNotHave = 'error-message'
      }

      const mainContainerClassName = '.error-message__main-container'
      const message = 'There is an error'
      const component = shallow(<ErrorMessage message={message} showError={visible} />)
      const mainContainer = component.find(mainContainerClassName)

      expect(mainContainer.hasClass(shouldHave)).to.equal(true)
      expect(mainContainer.hasClass(shouldNotHave)).to.equal(false)
    })
  })

  it('should show content based on visibility', function () {
    const visibilitySetting = [true, false]

    visibilitySetting.forEach(visible => {
      const mainContainerClassName = '.error-message__main-container'
      const message = 'There is an error'
      const component = shallow(<ErrorMessage message={message} showError={visible} />)
      const result = component.find(mainContainerClassName).text()

      expect(result).to.have.length(visible ? message.length : 0)
    })
  })
})
