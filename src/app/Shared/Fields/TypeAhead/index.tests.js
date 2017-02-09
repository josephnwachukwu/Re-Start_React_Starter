import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

proxyquire.noCallThru()

describe('TypeAhead dropdown component', function () {
  it('should call the getSearchResults on input change and populate dropdown with results', function (done) {
    const getSearchResults = sinon.stub().returns(Promise.resolve({
      Payload: {
        ColumnNames: [],
        Results: [
          [
            'Test 1',
            'Test 2'
          ]
        ]
      }
    }))

    const TypeAheadPatched = proxyquire(
      './index.js',
      {
        './Api': {
          getSearchResults
        }
      }
    ).default

    const typeAhead = mount(
      <TypeAheadPatched
        minNumCharacters={1}
        debounceTime={0}
      />)

    const input = typeAhead.find('input')

    input.simulate('focus')
    input.simulate('change', {target: {value: 'test'}})
    expect(input.get(0).value).to.equal('test')

    setTimeout(() => {
      expect(getSearchResults.called).to.equal(true)
      expect(typeAhead.find('.type-ahead__option-content').text()).to.equal('Test 1')
      expect(typeAhead.find('.type-ahead__option-content--last').text()).to.equal('Test 2')
      done()
    }, 10)
  })

  it('should not getSearchResults if input is less than minNumCharacters', function (done) {
    const getSearchResults = sinon.stub().returns(Promise.resolve({
      Payload: {
        ColumnNames: [],
        Results: []
      }
    }))

    const TypeAheadPatched = proxyquire(
      './index.js',
      {
        './Api': {
          getSearchResults
        }
      }
    ).default

    const typeAhead = mount(
      <TypeAheadPatched
        minNumCharacters={5}
        debounceTime={0}
      />)

    const input = typeAhead.find('input')

    input.simulate('focus')
    input.simulate('change', {target: {value: 'test'}})
    expect(input.get(0).value).to.equal('test')

    setTimeout(() => {
      expect(getSearchResults.called).to.equal(false)
      done()
    }, 10)
  })
})
