import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import QuickActions from './index.js'

describe('Quick Actions component', function () {
  it('has the correct label', function () {
    expect(shallow(<QuickActions expanded />).find('.quick-actions__expand-all').text()).to.equal('Collapse All')
  })

  it('has a working expand button', function () {
    let expanded = true
    const toggleExpanded = () => {
      expanded = false
    }

    const quickActions = shallow(<QuickActions expanded={expanded} toggleExpanded={toggleExpanded} />)
    quickActions.find('.quick-actions__expand-all').simulate('click')
    expect(expanded).to.equal(false)
  })
})
