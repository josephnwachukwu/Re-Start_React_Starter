import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import format from 'date-fns/format'
import subDays from 'date-fns/sub_days'

import PatientHistoryFilter from './index.js'

describe('Patient History Filter component', function () {
  it('calls passed functions when clicked', function () {
    let num = false
    const click = () => { num = true }
    const applyClick = (filters) => { num = filters }
    const filter = shallow(<PatientHistoryFilter expanded={num} toggleCardExpanded={click} onFormSubmit={applyClick} />)

    filter.find('.patient-history-filter__showing-button').simulate('click')
    expect(num).to.equal(true)
    filter.find('.patient-history-filter__apply-button').simulate('click')
    expect(num.selectedDate[0]).to.equal('14 Days')
    expect(num.selectedDate[1]).to.equal(format(subDays(Date(), 14), 'MM-DD-YYYY'))
    expect(num.selectedDate[2]).to.equal(format(Date(), 'MM-DD-YYYY'))
  })

  it('updates when props are changed', function () {
    const date = { selectedDate: ['14 Days'] }
    const dateUpdated = { selectedDate: ['30 Days'] }
    const filter = shallow(<PatientHistoryFilter expanded={false} selectedValues={date} />)

    expect(filter.find('.patient-history-filter__showing-date').text()).to.equal('Last 14 Days')
    expect(filter.find('.patient-history-filter__showing-button').text()).to.equal('Expand All')

    filter.setProps({expanded: true, selectedValues: dateUpdated})
    expect(filter.find('.patient-history-filter__showing-button').text()).to.equal('Collapse All')
    expect(filter.find('.patient-history-filter__showing-date').text()).to.equal('Last 30 Days')
  })

  it('has error handling', function () {
    const filter = mount(<PatientHistoryFilter />)

    filter.find('.patient-history-filter__show-last-buttons--last').simulate('click')
    expect(filter.find('.patient-history-filter__custom-date').length).to.equal(1)
    filter.find('.patient-history-filter__apply-button').simulate('click')
    expect(filter.state('customDatesValid')[0]).to.equal(false)
    expect(filter.state('customDatesValid')[1]).to.equal(false)
  })
})
