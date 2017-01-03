import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

import PinButton from './index.js'

import Pin from '../../../theme/icons/Pinned.svg'
import Unpin from '../../../theme/icons/Unpinned.svg'

describe('PinButton component', function () {
  it('has the correct icon', function () {
    expect(shallow(<PinButton pinned />).find(Pin).length).to.equal(1)
    expect(shallow(<PinButton pinned={false} />).find(Unpin).length).to.equal(1)
  })

  it('calls setPinnedStatus API method on click', function (done) {
    const setPinnedStatus = sinon.stub().returns(Promise.resolve([]))

    const PinButtonPatched = proxyquire(
      './index.js',
      {
        './Api': {
          setPinnedStatus
        }
      }
    ).default

    const pinButton = shallow(
      <PinButtonPatched
        pinned
        updatePinnedStatus={() => Promise.resolve([])}
      />
    )

    pinButton.find('.pin-button').simulate('click', { stopPropagation: () => {} })
    expect(setPinnedStatus.called).to.equal(true)
    expect(pinButton.state('loading')).to.equal(true)

    // wait for setState to be called by throwing this other expect
    // to the end of the processing queue via setImmediate
    setImmediate(() => {
      expect(pinButton.state('loading')).to.equal(false)
      expect(pinButton.find('.disabled').length).to.equal(0)
      expect(pinButton.state('clickable')).to.equal(true)
      done()
    })
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

  it('calls parent container updatePinnedStatus handler with the correct arguments', function (done) {
    const updatePinnedStatus = sinon.spy()
    const setPinnedStatus = sinon.stub().returns(Promise.resolve([]))

    const PinButtonPatched = proxyquire(
      './index.js',
      {
        './Api': {
          setPinnedStatus
        }
      }
    ).default

    const pinButton = shallow(
      <PinButtonPatched
        claimId='123'
        pinned
        updatePinnedStatus={updatePinnedStatus}
      />
    )

    pinButton.find('.pin-button').simulate('click', { stopPropagation: () => {} })

    // wait for setState to be called by throwing this other expect
    // to the end of the processing queue via setImmediate
    setImmediate(() => {
      expect(updatePinnedStatus.calledWith('123', false)).to.equal(true)
      done()
    })
  })
})
