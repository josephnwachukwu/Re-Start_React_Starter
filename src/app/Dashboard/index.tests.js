import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

// import Dashboard from './index.js'

proxyquire.noCallThru()

describe('Dashboard component', function () {
  it('should call the getClaimActions method on componentDidMount', function () {
    const getClaimActions = sinon.stub().returns(Promise.resolve([]))
    const DashboardPatched = proxyquire(
      './index.js',
      {
        './Api': {
          getClaimActions
        }
      }
    ).default
    mount(<DashboardPatched />)
    expect(getClaimActions.called).to.equal(true)
  })
})
