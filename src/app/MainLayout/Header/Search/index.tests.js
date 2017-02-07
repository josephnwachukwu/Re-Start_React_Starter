import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

import Search from './index.js'

describe('Search container component', function () {
  it('should call the getSearchResults method, set loading state to false, and populate dropdown with results', function (done) {
    const getSearchResults = sinon.stub().returns(Promise.resolve({
      Payload: {
        ResultCount: 1,
        Adjusters: [],
        Claims: [
          {
            ClaimId: 'E9187640-8F8C-4BB6-B61B-54B9D1C67F20',
            ClaimNumber: 'WC20060',
            AdjusterId: 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2c',
            PatientId: 'a62d7b97-23a2-485b-9eae-f93f76d905ae',
            PatientFirstName: 'Afirst',
            PatientLastName: 'Plastxx',
            IsPinned: false,
            IsActive: true
          }
        ]
      }
    }))

    const SearchBarPatched = proxyquire(
      './index.js',
      {
        './Api': {
          getSearchResults
        }
      }
    ).default

    const searchBar = mount(
      <SearchBarPatched
        minNumCharacters={1}
        resultLimit={0}
        debounceTime={0}
      />)

    const input = searchBar.find('.search__input-box')

    input.simulate('focus')
    input.simulate('change', {target: {value: 'first'}})
    expect(searchBar.state('openDropdown')).to.equal(true)
    expect(searchBar.state('keyword')).to.equal('first')

    setTimeout(() => {
      expect(getSearchResults.called).to.equal(true)
      expect(getSearchResults.callCount).to.equal(1)
      expect(searchBar.state('loading')).to.equal(false)
      expect(searchBar.state('showNoResults')).to.equal(false)
      expect(searchBar.update().find('.search__result-patient-name').text()).to.equal('Afirst Plastxx')
      expect(searchBar.update().find('.search__result-claim-number').text()).to.equal('WC20060')
      done()
    }, 10)
  })

  it('does not call the getSearchResults method when less than 3 characters are input', function (done) {
    const getSearchResults = sinon.stub().returns(Promise.resolve({
      Payload: {
        ResultCount: 1,
        Adjusters: [],
        Claims: []
      }
    }))

    const SearchBarPatched = proxyquire(
      './index.js',
      {
        './Api': {
          getSearchResults
        }
      }
    ).default

    const searchBar = mount(
      <SearchBarPatched
        minNumCharacters={3}
        resultLimit={0}
        debounceTime={0}
      />)

    const input = searchBar.find('.search__input-box')

    input.simulate('focus')
    input.simulate('change', {target: {value: 'fi'}})

    expect(searchBar.state('openDropdown')).to.equal(true)
    expect(searchBar.state('keyword')).to.equal('fi')

    setTimeout(() => {
      expect(searchBar.state('loading')).to.equal(false)
      expect(getSearchResults.called).to.equal(false)
      done()
    }, 0)
  })

  it('shows no results when results are empty', function (done) {
    const getSearchResults = sinon.stub().returns(Promise.resolve({
      Payload: {
        ResultCount: 0,
        Adjusters: [],
        Claims: []
      }
    }))

    const SearchBarPatched = proxyquire(
      './index.js',
      {
        './Api': {
          getSearchResults
        }
      }
    ).default

    const searchBar = mount(
      <SearchBarPatched
        minNumCharacters={1}
        resultLimit={0}
        debounceTime={0}
      />)

    const input = searchBar.find('.search__input-box')

    input.simulate('focus')
    input.simulate('change', {target: {value: 'test'}})

    expect(searchBar.state('openDropdown')).to.equal(true)
    expect(searchBar.state('keyword')).to.equal('test')

    setTimeout(() => {
      expect(getSearchResults.called).to.equal(true)
      expect(searchBar.state('loading')).to.equal(false)
      expect(searchBar.state('showNoResults')).to.equal(true)
      expect(searchBar.find('.search_no-results-text').text()).to.equal('No Results Found.')
      done()
    }, 10)
  })

  it('displays view all claims and adds new patient links', function () {
    const searchBar = mount(<Search />)
    const input = searchBar.find('.search__input-box')

    input.simulate('focus')

    expect(searchBar.state('openDropdown')).to.equal(true)
    expect(searchBar.state('showPlaceholder')).to.equal(false)
    expect(searchBar.find('.search__view-all-claims').text()).to.equal('View all Active Claims')
    expect(searchBar.find('.search__create-new-patient').text()).to.equal('Create New Patient')
  })

  it('resets state when dropdown is not focused', function () {
    const searchBar = mount(<Search />)
    const input = searchBar.find('.search__input-box')

    input.simulate('focus')

    expect(searchBar.state('openDropdown')).to.equal(true)
    expect(searchBar.state('showPlaceholder')).to.equal(false)

    document.body.click()

    expect(searchBar.state('openDropdown')).to.equal(false)
    expect(searchBar.state('showPlaceholder')).to.equal(true)
  })
})
