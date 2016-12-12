import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

import ClaimsList from './index.js'
import Section from './Section'
import Subheader from './Subheader'

proxyquire.noCallThru()

describe('ClaimsList component', function () {
  it('has a binClaims method that bins/chunks claims based on patient lastname and pinned status', function () {
    const claimsList = shallow(<ClaimsList />)

    const initialClaims = [
      {
        'PatientFirstName': 'Jon',
        'PatientLastName': 'Lang',
        'DOB': '1967-08-27T00:00:00.000Z',
        'DOI': '2016-07-11T00:00:00.000Z',
        'ClaimNumber': 'WC12312234235',
        'IsActive': true,
        'ClaimSystemId': '857a126b-854a-4ea9-8214-60751e390da3',
        'PatientId': 'ec054230-ec1f-4aaa-861d-4e84160797f1',
        'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
        'IsPinned': true
      },
      {
        'PatientFirstName': 'Kelly',
        'PatientLastName': 'Wang',
        'DOB': '1992-12-29T00:00:00.000Z',
        'DOI': '2015-02-19T00:00:00.000Z',
        'ClaimNumber': 'WC12312234236',
        'IsActive': true,
        'ClaimSystemId': 'ddcaafc7-17e4-4ab7-ad9a-0bf369b2cddb',
        'PatientId': 'a01789ab-7001-48d1-a270-3d83c084e75d',
        'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
        'IsPinned': false
      }
    ]
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')
    let expectedBinnedClaims = {
      Pinned: []
    }
    alphabet.forEach((letter) => {
      expectedBinnedClaims[letter] = []
    })

    expectedBinnedClaims['Pinned'] = [{
      'PatientFirstName': 'Jon',
      'PatientLastName': 'Lang',
      'DOB': '1967-08-27T00:00:00.000Z',
      'DOI': '2016-07-11T00:00:00.000Z',
      'ClaimNumber': 'WC12312234235',
      'IsActive': true,
      'ClaimSystemId': '857a126b-854a-4ea9-8214-60751e390da3',
      'PatientId': 'ec054230-ec1f-4aaa-861d-4e84160797f1',
      'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
      'IsPinned': true
    }]

    expectedBinnedClaims['L'] = expectedBinnedClaims['Pinned']
    expectedBinnedClaims['W'] = [{
      'PatientFirstName': 'Kelly',
      'PatientLastName': 'Wang',
      'DOB': '1992-12-29T00:00:00.000Z',
      'DOI': '2015-02-19T00:00:00.000Z',
      'ClaimNumber': 'WC12312234236',
      'IsActive': true,
      'ClaimSystemId': 'ddcaafc7-17e4-4ab7-ad9a-0bf369b2cddb',
      'PatientId': 'a01789ab-7001-48d1-a270-3d83c084e75d',
      'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
      'IsPinned': false
    }]

    const actualBinnedClaims = claimsList.instance().binClaims(initialClaims)

    expect(actualBinnedClaims).to.deep.equal(expectedBinnedClaims)
  })

  it('sorts the section titles as expected', function () {
    const claims = [
      {
        'PatientFirstName': 'Jon',
        'PatientLastName': 'Lang',
        'DOB': '1967-08-27T00:00:00.000Z',
        'DOI': '2016-07-11T00:00:00.000Z',
        'ClaimNumber': 'WC12312234235',
        'IsActive': true,
        'ClaimSystemId': '857a126b-854a-4ea9-8214-60751e390da3',
        'PatientId': 'ec054230-ec1f-4aaa-861d-4e84160797f1',
        'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
        'IsPinned': true
      },
      {
        'PatientFirstName': 'Kelly',
        'PatientLastName': 'Wang',
        'DOB': '1992-12-29T00:00:00.000Z',
        'DOI': '2015-02-19T00:00:00.000Z',
        'ClaimNumber': 'WC12312234236',
        'IsActive': true,
        'ClaimSystemId': 'ddcaafc7-17e4-4ab7-ad9a-0bf369b2cddb',
        'PatientId': 'a01789ab-7001-48d1-a270-3d83c084e75d',
        'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
        'IsPinned': false
      }
    ]

    const binnedClaims = {
      Pinned: [
        {
          'PatientFirstName': 'Jon',
          'PatientLastName': 'Lang',
          'DOB': '1967-08-27T00:00:00.000Z',
          'DOI': '2016-07-11T00:00:00.000Z',
          'ClaimNumber': 'WC12312234235',
          'IsActive': true,
          'ClaimSystemId': '857a126b-854a-4ea9-8214-60751e390da3',
          'PatientId': 'ec054230-ec1f-4aaa-861d-4e84160797f1',
          'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
          'IsPinned': true
        }
      ],
      L: [
        {
          'PatientFirstName': 'Jon',
          'PatientLastName': 'Lang',
          'DOB': '1967-08-27T00:00:00.000Z',
          'DOI': '2016-07-11T00:00:00.000Z',
          'ClaimNumber': 'WC12312234235',
          'IsActive': true,
          'ClaimSystemId': '857a126b-854a-4ea9-8214-60751e390da3',
          'PatientId': 'ec054230-ec1f-4aaa-861d-4e84160797f1',
          'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
          'IsPinned': true
        }
      ],
      W: [
        {
          'PatientFirstName': 'Kelly',
          'PatientLastName': 'Wang',
          'DOB': '1992-12-29T00:00:00.000Z',
          'DOI': '2015-02-19T00:00:00.000Z',
          'ClaimNumber': 'WC12312234236',
          'IsActive': true,
          'ClaimSystemId': 'ddcaafc7-17e4-4ab7-ad9a-0bf369b2cddb',
          'PatientId': 'a01789ab-7001-48d1-a270-3d83c084e75d',
          'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
          'IsPinned': false
        }
      ]
    }
    const claimsList = shallow(<ClaimsList />)
    claimsList.setState({
      claims,
      binnedClaims
    })

    expect(claimsList.find(Section).length).to.equal(3)
    expect(claimsList.find(Section).at(0).prop('title')).to.equal('Pinned')
    expect(claimsList.find(Section).at(1).prop('title')).to.equal('L')
    expect(claimsList.find(Section).at(2).prop('title')).to.equal('W')
  })

  it('to pass the correct number of claims to the the claims header', function () {
    const claims = [
      {
        'PatientFirstName': 'Jon',
        'PatientLastName': 'Lang',
        'DOB': '1967-08-27T00:00:00.000Z',
        'DOI': '2016-07-11T00:00:00.000Z',
        'ClaimNumber': 'WC12312234235',
        'IsActive': true,
        'ClaimSystemId': '857a126b-854a-4ea9-8214-60751e390da3',
        'PatientId': 'ec054230-ec1f-4aaa-861d-4e84160797f1',
        'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
        'IsPinned': true
      },
      {
        'PatientFirstName': 'Kelly',
        'PatientLastName': 'Wang',
        'DOB': '1992-12-29T00:00:00.000Z',
        'DOI': '2015-02-19T00:00:00.000Z',
        'ClaimNumber': 'WC12312234236',
        'IsActive': true,
        'ClaimSystemId': 'ddcaafc7-17e4-4ab7-ad9a-0bf369b2cddb',
        'PatientId': 'a01789ab-7001-48d1-a270-3d83c084e75d',
        'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
        'IsPinned': false
      },
      {
        'PatientFirstName': 'Bob',
        'PatientLastName': 'Wang',
        'DOB': '1992-12-29T00:00:00.000Z',
        'DOI': '2015-02-19T00:00:00.000Z',
        'ClaimNumber': 'WC12312234277',
        'IsActive': true,
        'ClaimSystemId': 'ddcaafc7-17e4-4ab7-ad9a-0bf369b2cfff',
        'PatientId': 'a01789ab-7001-48d1-a270-3d83c084e888',
        'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
        'IsPinned': true
      }
    ]

    const binnedClaims = {
      Pinned: [
        {
          'PatientFirstName': 'Jon',
          'PatientLastName': 'Lang',
          'DOB': '1967-08-27T00:00:00.000Z',
          'DOI': '2016-07-11T00:00:00.000Z',
          'ClaimNumber': 'WC12312234235',
          'IsActive': true,
          'ClaimSystemId': '857a126b-854a-4ea9-8214-60751e390da3',
          'PatientId': 'ec054230-ec1f-4aaa-861d-4e84160797f1',
          'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
          'IsPinned': true
        },
        {
          'PatientFirstName': 'Bob',
          'PatientLastName': 'Wang',
          'DOB': '1992-12-29T00:00:00.000Z',
          'DOI': '2015-02-19T00:00:00.000Z',
          'ClaimNumber': 'WC12312234277',
          'IsActive': true,
          'ClaimSystemId': 'ddcaafc7-17e4-4ab7-ad9a-0bf369b2cfff',
          'PatientId': 'a01789ab-7001-48d1-a270-3d83c084e888',
          'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
          'IsPinned': true
        }
      ],
      L: [
        {
          'PatientFirstName': 'Jon',
          'PatientLastName': 'Lang',
          'DOB': '1967-08-27T00:00:00.000Z',
          'DOI': '2016-07-11T00:00:00.000Z',
          'ClaimNumber': 'WC12312234235',
          'IsActive': true,
          'ClaimSystemId': '857a126b-854a-4ea9-8214-60751e390da3',
          'PatientId': 'ec054230-ec1f-4aaa-861d-4e84160797f1',
          'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
          'IsPinned': true
        }
      ],
      W: [
        {
          'PatientFirstName': 'Bob',
          'PatientLastName': 'Wang',
          'DOB': '1992-12-29T00:00:00.000Z',
          'DOI': '2015-02-19T00:00:00.000Z',
          'ClaimNumber': 'WC12312234277',
          'IsActive': true,
          'ClaimSystemId': 'ddcaafc7-17e4-4ab7-ad9a-0bf369b2cfff',
          'PatientId': 'a01789ab-7001-48d1-a270-3d83c084e888',
          'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
          'IsPinned': true
        },
        {
          'PatientFirstName': 'Kelly',
          'PatientLastName': 'Wang',
          'DOB': '1992-12-29T00:00:00.000Z',
          'DOI': '2015-02-19T00:00:00.000Z',
          'ClaimNumber': 'WC12312234236',
          'IsActive': true,
          'ClaimSystemId': 'ddcaafc7-17e4-4ab7-ad9a-0bf369b2cddb',
          'PatientId': 'a01789ab-7001-48d1-a270-3d83c084e75d',
          'AdjusterId': 'dd054230-ec1f-4aaa-861d-4e84160799f4',
          'IsPinned': false
        }
      ]
    }
    const claimsList = shallow(<ClaimsList />)
    claimsList.setState({
      claims,
      binnedClaims
    })

    expect(claimsList.find(Subheader).prop('claimCount')).to.equal(3)
  })

  it('should call the getClaimsList method on componentDidMount', function () {
    const getClaimsList = sinon.stub().returns(Promise.resolve([]))
    const ClaimsListPatched = proxyquire(
      './index.js',
      {
        './api': {
          getClaimsList
        }
      }
    ).default
    mount(<ClaimsListPatched />)
    expect(getClaimsList.called).to.equal(true)
  })
})
