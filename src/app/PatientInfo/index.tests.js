import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

// import PatientInfo from './index.js'

proxyquire.noCallThru()

describe('PatientInfo container component', function () {
  it('should call the getClaimActions method on componentDidMount', function () {
    const getClaimActions = sinon.stub().returns(Promise.resolve([]))
    const PatientInfoPatched = proxyquire(
      './index.js',
      {
        './Api': {
          getClaimActions
        }
      }
    ).default
    mount(<PatientInfoPatched />)
    expect(getClaimActions.called).to.equal(true)
  })
})
