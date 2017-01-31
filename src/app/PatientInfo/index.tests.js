import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

import PatientInfo from './index.js'
import LoadingSpinner from '../../theme/spinners/Animation-Loader.svg'

proxyquire.noCallThru()

describe('PatientInfo container component', function () {
  it('should call the getPatientInfo, and getResourceValue methods on componentDidMount and set loading state to false', function (done) {
    const getPatientInfo = sinon.stub().returns(Promise.resolve([]))
    const getDropdownData = sinon.stub().returns(Promise.resolve([]))

    const PatientInfoPatched = proxyquire(
      './index.js',
      {
        './Api': {
          getPatientInfo,
          getDropdownData
        }
      }
    ).default

    const location = { query: { claimId: 'test' } }

    const patientInfo = mount(<PatientInfoPatched location={location} />)
    expect(getPatientInfo.called).to.equal(true)
    expect(getDropdownData.called).to.equal(true)

    expect(patientInfo.state('loading')).to.equal(true)

    // wait for setState to be called by throwing this other expect
    // to the end of the processing queue via setImmediate
    setImmediate(() => {
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
