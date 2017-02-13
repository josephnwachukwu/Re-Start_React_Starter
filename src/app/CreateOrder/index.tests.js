import React from 'react'
import { expect } from 'chai'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

import LoadingSpinner from '../../theme/spinners/Animation-Loader.svg'
import CreateOrder from './index.js'

describe('CreateOrder container component', function () {
  it('should call the getOrderForms method on componentDidMount and set loading state to false', function (done) {
    const getOrderForms = sinon.stub().returns(Promise.resolve({
      sampleData: [ 1, 2, 3 ]
    }))

    const CreateOrderPatched = proxyquire(
      './index.js',
      {
        './Api': {
          getOrderForms
        }
      }
    ).default

    const component = mount(<CreateOrderPatched />)

    expect(getOrderForms.called).to.equal(true)
    expect(component.state('loading')).to.equal(true)

    setImmediate(() => {
      expect(component.state('loading')).to.equal(false)
      done()
    })
  })

  it('displays the loading spinner while loading', function (done) {
    const component = shallow(<CreateOrder />)

    expect(component.find(LoadingSpinner).exists()).to.equal(false)

    component.setState({
      loading: true
    }, () => {
      expect(component.find(LoadingSpinner).exists()).to.equal(true)
      done()
    })
  })
})
