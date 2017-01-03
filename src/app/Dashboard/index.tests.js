import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

describe('Dashboard container component', function () {
  it('should call the getClaimActions and getMetrics methods on componentDidMount and set loading state to false', function (done) {
    const getClaimActions = sinon.stub().returns(Promise.resolve([]))
    const getMetrics = sinon.stub().returns(Promise.resolve([]))

    const DashboardPatched = proxyquire(
      './index.js',
      {
        './Api': {
          getClaimActions,
          getMetrics
        }
      }
    ).default

    const dashboard = mount(<DashboardPatched />)
    expect(getClaimActions.called).to.equal(true)
    expect(getMetrics.called).to.equal(true)

    expect(dashboard.state('loading')).to.equal(true)

    // wait for setState to be called by throwing this other expect
    // to the end of the processing queue via setImmediate
    setImmediate(() => {
      expect(dashboard.state('loading')).to.equal(false)
      done()
    })
  })
})
