import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import PatientCount from './index.js'

describe('PatientCount component', function () {
  it('should show the correct pinned and total counts from passed props', function () {
    const patientCount = shallow(<PatientCount pinnedCount={45} totalCount={100} />)

    expect(patientCount.find('.patient-count__fraction').text()).to.equal('You have 45 out of 100')
    expect(patientCount.find('.patient-count__pie-chart-number').text()).to.equal('45')
  })
})
