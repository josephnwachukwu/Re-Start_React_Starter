import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import PinButton from './index.js'

import Pin from '../../../theme/icons/Pinned.svg'
import Unpin from '../../../theme/icons/Unpinned.svg'

describe('PinButton component', function () {
  it('has the correct icon', function () {
    expect(shallow(<PinButton pinned />).find(Pin).length).to.equal(1)
    expect(shallow(<PinButton pinned={false} />).find(Unpin).length).to.equal(1)
  })

  it('sets disabled class when clickable state is false', function () {
    const pinButton = shallow(
      <PinButton
        pinned
        updatePinnedStatus={() => Promise.resolve([])}
      />
    )

    expect(pinButton.find('.disabled').length).to.equal(0)

    pinButton.setState({
      clickable: false
    })

    expect(pinButton.find('.disabled').length).to.equal(1)
  })

  it('calls parent container updatePinnedStatus handler with the correct arguments', function () {
    const updatePinnedStatus = sinon.stub().returns(Promise.resolve([]))
    const pinButton = shallow(
      <PinButton
        claimId='123'
        pinned
        updatePinnedStatus={updatePinnedStatus}
      />
    )

    pinButton.find('.pin-button').simulate('click', { stopPropagation: () => {} })

    expect(updatePinnedStatus.calledWith('123', false)).to.equal(true)
  })
})
