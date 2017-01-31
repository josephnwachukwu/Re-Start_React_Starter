import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

import PatientHistory from './index.js'
import LoadingSpinner from '../../../theme/spinners/Animation-Loader.svg'

proxyquire.noCallThru()

describe('Patient History container component', function () {
  it('should call the getClaimActions method on componentDidMount and set loading state to false', function (done) {
    const getClaimActions = sinon.stub().returns(Promise.resolve({
      Payload: {
        Actions: []
      }
    }))

    const PatientHistoryPatched = proxyquire(
      './index.js',
      {
        '../Api': {
          getClaimActions
        }
      }
    ).default

    const patientHistory = mount(<PatientHistoryPatched />)
    expect(getClaimActions.called).to.equal(true)
    expect(patientHistory.state('loading')).to.equal(true)

    // wait for setState to be called by throwing this other expect
    // to the end of the processing queue via setImmediate
    setImmediate(() => {
      expect(patientHistory.state('loading')).to.equal(false)
      done()
    })
  })

  it('displays the loading spinner while loading', function () {
    const patientHistory = shallow(<PatientHistory />)
    expect(patientHistory.state().loading).to.equal(true)
    expect(patientHistory.find(LoadingSpinner).length).to.equal(1)
    patientHistory.setState({loading: false})
    expect(patientHistory.find(LoadingSpinner).length).to.equal(0)
  })

  it('updates claims when new props are received', function (done) {
    const getClaimActions = sinon.stub().returns(Promise.resolve({
      Payload: {
        Actions: []
      }
    }))

    const PatientHistoryPatched = proxyquire(
      './index.js',
      {
        '../Api': {
          getClaimActions
        }
      }
    ).default

    const patientHistory = mount(<PatientHistoryPatched />)

    expect(patientHistory.state('loading')).to.equal(true)
    expect(getClaimActions.called).to.equal(true)

    setImmediate(() => {
      expect(patientHistory.state('loading')).to.equal(false)
      patientHistory.setProps({filterClaimActions: {selectedDate: ['', '', ''], selectedType: '', selectedStatus: ''}})

      expect(patientHistory.state('loading')).to.equal(true)
      expect(getClaimActions.called).to.equal(true)

      setImmediate(() => {
        expect(patientHistory.state('loading')).to.equal(false)
        done()
      })
    })
  })

  it('displays the correct date', function (done) {
    const getClaimActions = sinon.stub().returns(Promise.resolve({
      Payload: {
        Actions: [
          {
            ActionId: 'ActionId',
            ProductLine: 'ProductLine',
            ServiceType: 'ServiceType',
            Status: 'Status',
            StatusDetail: 'StatusDetail',
            ActionTitle: 'ActionTitle',
            ActionDate: '2017-01-18T10:23:00.000Z',
            ActionDetail: []
          }
        ]
      }
    }))

    const PatientHistoryPatched = proxyquire(
      './index.js',
      {
        '../Api': {
          getClaimActions
        }
      }
    ).default

    const patientHistory = mount(<PatientHistoryPatched />)

    setImmediate(() => {
      expect(patientHistory.find('.patient-history__title').text()).to.equal('Week of January 15th, 2017')
      done()
    })
  })
})
