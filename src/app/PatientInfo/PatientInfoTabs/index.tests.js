import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import PatientInfoTabs from './index.js'

describe('Patient Info Tabs component', function () {
  it('has the correct dates', function () {
    const mockData = [
      {
        'Title': 'Injury',
        'Details': [
          {
            'DOI': '2016-12-05T00:00:00.000Z'
          }
        ]
      },
      {
        'Title': 'Demographics',
        'Details': [
          {
            'DOB': '1970-07-27T00:00:00.000Z',
            'Address': ''
          }
        ]
      }
    ]

    const infoTabs = mount(<PatientInfoTabs info={mockData} />)
    expect(infoTabs.find('.patient-info-tabs__injury-date').text()).to.equal('December 5, 2016')
    infoTabs.find('.patient-info-tabs__tab-button--demographics').simulate('click')
    expect(infoTabs.find('.patient-info-tabs__birthday').text()).to.equal('July 27, 1970')
  })

  it('has the correct attorney name', function () {
    const mockData = [
      {
        'Title': 'Injury',
        'Details': [
          {
            'DOI': '2016-12-05T00:00:00.000Z'
          }
        ]
      },
      {
        'Title': 'Demographics',
        'Details': [
          {
            'DOB': '1970-07-27T00:00:00.000Z',
            'Address': ''
          }
        ]
      },
      {
        'Title': 'Physician',
        'Details': [
          {
            'Address': ''
          }
        ]
      },
      {
        'Title': 'Attorney',
        'Details': [
          {
            'AttorneyName': 'Katherine M. Massa\nMorgan & Morgan PA',
            'Address': ''
          }
        ]
      }
    ]
    const infoTabs = mount(<PatientInfoTabs info={mockData} />)
    infoTabs.find('.patient-info-tabs__tab-button--attorney').simulate('click')
    expect(infoTabs.find('.patient-info-tabs__attorney-name').text()).to.equal('Katherine M. Massa')
    expect(infoTabs.find('.patient-info-tabs__details--secondary').text()).to.equal('Morgan & Morgan PA')
  })

  it('updates component when tabs are clicked', function () {
    const mockData = [
      {
        'Title': 'Injury',
        'Details': [
          {
            'DOI': '2016-12-05T00:00:00.000Z'
          }
        ]
      },
      {
        'Title': 'Demographics',
        'Details': [
          {
            'DOB': '2016-12-05T00:00:00.000Z',
            'Address': ''
          }
        ]
      }
    ]

    const infoTabs = mount(<PatientInfoTabs info={mockData} />)
    expect(infoTabs.state().selected).to.equal('Injury')
    expect(infoTabs.find('.patient-info-tabs__tab-button--active').text()).to.equal('Injury')
    infoTabs.find('.patient-info-tabs__tab-button--demographics').simulate('click')
    expect(infoTabs.state().selected).to.equal('Demographics')
    expect(infoTabs.find('.patient-info-tabs__tab-button--active').text()).to.equal('Demographics')
  })
})
