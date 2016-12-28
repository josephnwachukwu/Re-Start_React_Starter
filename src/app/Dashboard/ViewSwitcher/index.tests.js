import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import ViewSwitcher from './index.js'

import CardView from '../../../theme/icons/ToggleViewer-Card.svg'
import ListViewActive from '../../../theme/icons/ToggleViewer-List-Active.svg'

describe('View Switcher component', function () {
  it('displays the expected buttons based on layout and expended state', function () {
    const viewSwitcher = shallow(<ViewSwitcher cardLayout='row' />)
    expect(viewSwitcher.find(CardView).length).to.equal(1)
    expect(viewSwitcher.find(ListViewActive).length).to.equal(1)
  })

  it('displays the expected button text', function () {
    expect(shallow(<ViewSwitcher cardExpanded />).find('.view-switcher__collapse-button--text').text()).to.equal('COLLAPSE ALL')
  })

  it('has clickable buttons', function () {
    let test = 0
    const click = () => { test++ }
    const viewSwitcher = shallow(
      <ViewSwitcher
        cardLayout='row'
        toggleCardExpanded={click}
        toggleCardLayout={click}
      />
    )

    viewSwitcher.find('.view-switcher__collapse-button').simulate('click')
    expect(test).to.equal(1)
    viewSwitcher.find('.view-switcher__row-button--active').simulate('click')
    expect(test).to.equal(2)
    viewSwitcher.find('.view-switcher__col-button').simulate('click')
    expect(test).to.equal(3)
  })
})
