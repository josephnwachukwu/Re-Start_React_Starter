import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

import LoadingSpinner from '../../theme/spinners/ring-alt-loader.svg'
import Dashboard from './index.js'

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

  it('has an updatePinnedStatus method that updates the pinned status for a claim and gets the latest metrics', function () {
    const getMetrics = sinon.stub().returns(Promise.resolve([]))

    const DashboardPatched = proxyquire(
      './index.js',
      {
        './Api': {
          getMetrics
        }
      }
    ).default

    const initialClaims = [
      {
        'ClaimSystemId': 'cf2de328-e9f0-46ff-80c6-4de61af1177d',
        'AdjusterId': 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b',
        'ClaimNumber': 'WC200240',
        'PatientFirstName': 'Afirst',
        'PatientLastName': 'Alast',
        'PinnedStatus': true,
        'Actions': [
          {
            'ActionId': '31242072-f9f1-40a0-a2a9-85f5d77fa96e',
            'ProductLine': 'Home Health Care',
            'ServiceType': 'Standard',
            'Status': 'Pending',
            'StatusDetail': '',
            'ActionTitle': 'Home Health Start of Care',
            'ActionDate': '1990-10-01T00:00:00.000Z',
            'ActionDetail': [
              {
                'Name': 'Service Type',
                'Value': 'In-Home Physical Therapy'
              },
              {
                'Name': 'Facility',
                'Value': 'ABC Home Health Care'
              },
              {
                'Name': 'Report',
                'Value': 'https://www.google.com/'
              },
              {
                'Name': 'Service Date',
                'Value': '10/01/1990'
              },
              {
                'Name': 'Medical Report',
                'Value': 'https://www.google.com/'
              }
            ]
          }
        ]
      }
    ]

    const dashboard = shallow(<DashboardPatched />)

    dashboard.setState({
      claims: initialClaims
    })

    expect(dashboard.state('claims')[0].PinnedStatus).to.equal(true)
    dashboard.instance().updatePinnedStatus('cf2de328-e9f0-46ff-80c6-4de61af1177d', false)
    expect(dashboard.state('claims')[0].PinnedStatus).to.equal(false)
  })

  it('has a working toggleCardExpanded function', function () {
    const dashboard = shallow(<Dashboard />)
    expect(dashboard.state().cardExpanded).to.equal(true)
    dashboard.instance().toggleCardExpanded()
    expect(dashboard.state().cardExpanded).to.equal(false)
  })

  it('has a working toggleCardLayout function', function () {
    const dashboard = shallow(<Dashboard />)
    expect(dashboard.state().cardLayout).to.equal('col')
    dashboard.instance().toggleCardLayout('row')
    expect(dashboard.state().cardLayout).to.equal('row')
  })

  it('displays the loading spinner while loading', function () {
    const dashboard = shallow(<Dashboard />)
    expect(dashboard.state().loading).to.equal(true)
    expect(dashboard.find(LoadingSpinner).length).to.equal(1)
    dashboard.setState({loading: false})
    expect(dashboard.find(LoadingSpinner).length).to.equal(0)
  })
})
