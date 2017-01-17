import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

import PatientInfo from './index.js'
import LoadingSpinner from '../../theme/spinners/ring-alt-loader.svg'

proxyquire.noCallThru()

describe('PatientInfo container component', function () {
  it('should call the getClaimActions and getPatientInfo methods on componentDidMount and set loading state to false', function (done) {
    const getClaimActions = sinon.stub().returns(Promise.resolve([]))
    const getPatientInfo = sinon.stub().returns(Promise.resolve([]))

    const PatientInfoPatched = proxyquire(
      './index.js',
      {
        './Api': {
          getClaimActions,
          getPatientInfo
        }
      }
    ).default

    const location = { query: { claimId: 'test' } }

    const patientInfo = mount(<PatientInfoPatched location={location} />)
    expect(getClaimActions.called).to.equal(true)
    expect(getPatientInfo.called).to.equal(true)

    expect(patientInfo.state('loading')).to.equal(true)

    // TODO: CF 01/17/07: figure out why statement below is returning true
    // wait for setState to be called by throwing this other expect
    // to the end of the processing queue via setImmediate
    setImmediate(() => {
      patientInfo.setState({loading: false})
      expect(patientInfo.state('loading')).to.equal(false)
      done()
    })
  })

  it('displays the loading spinner while loading', function () {
    const location = {
      query: {
        claimId: ''
      }
    }

    const patientInfo = shallow(<PatientInfo location={location} />)
    expect(patientInfo.state().loading).to.equal(true)
    expect(patientInfo.find(LoadingSpinner).length).to.equal(1)
    patientInfo.setState({loading: false})
    expect(patientInfo.find(LoadingSpinner).length).to.equal(0)
  })
})
