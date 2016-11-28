import React from 'react'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import Foo from './Foo'

describe('Foo example component', function () {
  it('contains the div we expect', function () {
    expect(shallow(<Foo />).contains(<div className='foo' />)).to.equal(true)
  })

  it('contains the classname foo', function () {
    expect(shallow(<Foo />).is('.foo')).to.equal(true)
  })

  it('gets mounted to the dom', function () {
    expect(mount(<Foo />).find('.foo').length).to.equal(1)
  })
})
