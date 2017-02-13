import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import ProductPage from '.'

describe('ProductPage component', function () {
  it('should display the hint bar when state.showHintBar is true', function () {
    const visibilitySetting = [true, false]

    visibilitySetting.forEach(visible => {
      const component = shallow(<ProductPage />)

      component.setState({
        showHintBar: visible
      })

      expect(component.find('.product-page__hint-bar').exists()).to.equal(visible)
    })
  })

  it('should hide the hint bar when the hint bar button is clicked', function () {
    const component = shallow(<ProductPage />)

    expect(component.find('.product-page__hint-bar').exists()).to.equal(true)

    component.find('.product-page__hint-button').simulate('click')

    expect(component.find('.product-page__hint-bar').exists()).to.equal(false)
  })
})
