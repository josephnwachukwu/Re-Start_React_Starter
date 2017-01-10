import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
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
    expect(shallow(<ViewSwitcher cardExpanded />).find('.view-switcher__collapse-button-text').text()).to.equal('COLLAPSE ALL')
  })

  it('has working buttons', function () {
    let test = 0
    const click = () => { test++ }
    const viewSwitcher = shallow(
      <ViewSwitcher
        cardLayout='row'
        cardExpanded
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

  it('updates when props are changed', function () {
    const viewSwitcher = mount(<ViewSwitcher cardLayout='row' cardExpanded={false} />)
    viewSwitcher.setProps({cardLayout: 'col', cardExpanded: true})
    expect(viewSwitcher.props().cardLayout).to.equal('col')
    expect(viewSwitcher.props().cardExpanded).to.equal(true)
  })
})
