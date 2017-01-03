import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import PinButton from './index.js'

import Pin from '../../../theme/icons/Pin-1.svg'
import Unpin from '../../../theme/icons/Unpin-1.svg'

describe('PinButton component', function () {
  it('has the correct icon', function () {
    expect(shallow(<PinButton pinned='true' />).find(Pin).length).to.equal(1)
    expect(shallow(<PinButton pinned='false' />).find(Unpin).length).to.equal(1)
  })

  // it('called setPinnedStatus API method on click', function () {})
  // it('sets disabled class on click and clickable state to false', function () {})
  // it('unsets disabled class on API success and clickable state to true', function () {})
  // it('calls parent container updatePinnedStatus handler', function () {})
})
