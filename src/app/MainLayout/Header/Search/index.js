import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

import PinButton from '../../../Shared/PinButton'
import { getSearchResults, setPinnedStatus } from './Api'
import LoadingSpinner from '../../../../theme/spinners/Animation-Loader.svg'
import SearchIcon from '../../../../theme/icons/Top-Nav-Search.svg'

import './index.css'

export default class Search extends Component {
  constructor (props) {
    super(props)

    this.onMouseEnterSearchBox = this.onMouseEnterSearchBox.bind(this)
    this.onMouseLeaveSearchBox = this.onMouseLeaveSearchBox.bind(this)
    this.onChangeInput = this.onChangeInput.bind(this)
    this.onFocusInput = this.onFocusInput.bind(this)
    this.clickPlaceholder = this.clickPlaceholder.bind(this)
    this.clickOutsideSearch = this.clickOutsideSearch.bind(this)
    this.closeDropdown = this.closeDropdown.bind(this)
    this.redirect = this.redirect.bind(this)
    this.renderDropdown = this.renderDropdown.bind(this)
    this.highlightKeyword = this.highlightKeyword.bind(this)
    this.updatePinnedStatus = this.updatePinnedStatus.bind(this)
    this.getResults = _.debounce(this.getResults.bind(this), props.debounceTime)

    this.ajaxRequest = null

    this.state = {
      open: false,
      keyword: '',
      showPlaceholder: true,
      results: [],
      resultCount: 0,
      openDropdown: false,
      showNoResults: false,
      loading: false
    }
  }

  componentWillMount () {
    document.body.addEventListener('click', this.clickOutsideSearch)
  }

  componentWillUnmount () {
    document.body.removeEventListener('click', this.clickOutsideSearch)
  }

  onMouseEnterSearchBox (e) {
    this.setState({
      openDropdown: true
    })
  }

  onMouseLeaveSearchBox (e) {
    if (this.state.resultCount === 0 &&
        this.state.loading === false &&
        this.state.keyword.length === 0) {
      this.searchInput.blur()
      this.closeDropdown()
    }
  }

  onChangeInput (e) {
    const keyword = e.target.value
    const minNumCharacters = this.props.minNumCharacters

    this.setState(
      { keyword },
      () => {
        if (keyword.length >= minNumCharacters) {
          this.getResults(keyword)
        }
      }
    )
  }

  getResults (keyword) {
    // abort in-flight request and replace with latest one
    if (this.ajaxRequest && this.ajaxRequest.abort) {
      this.ajaxRequest.abort()
    }

    this.setState(
      { loading: true },
      () => {
        this.ajaxRequest = getSearchResults(keyword, this.props.resultLimit)

        this.ajaxRequest.then((response) => {
          this.setState({
            resultCount: response.Payload.ResultCount,
            results: response.Payload.Claims,
            showNoResults: response.Payload.ResultCount === 0,
            loading: false
          })
          this.searchInput.focus()
        })
      }
    )
  }

  clickPlaceholder (e) {
    this.setState(
      { showPlaceholder: false },
      () => {
        this.searchInput.focus()
      }
    )
  }

  onFocusInput (e) {
    this.setState({
      openDropdown: true,
      showPlaceholder: false
    })
  }

  clickOutsideSearch (e) {
    const target = e.target
    const searchBox = this.searchBox

    if (searchBox) {
      if (target !== searchBox && !searchBox.contains(target)) {
        this.closeDropdown()
      }
    }
  }

  closeDropdown (e) {
    this.setState({
      openDropdown: false,
      keyword: '',
      results: [],
      resultCount: 0,
      showPlaceholder: true,
      showNoResults: false,
      loading: false
    })
  }

  highlightKeyword (text = '', keyword = '') {
    const regex = new RegExp(`(${keyword})`, 'g')
    const chunks = text.split(regex)
    let match = false
    let className = ''

    return (
      chunks.map((chunk, index) => {
        match = (chunk === keyword)
        className = (match) ? 'search__result-text--match' : 'search__result-text'
        return (
          <span
            key={`${chunk}_${index}`}
            className={className}>
            {chunk}
          </span>
        )
      })
    )
  }

  updatePinnedStatus (claimId, newPinnedStatus) {
    // Set local claim pinnedStatus to newPinnedStatus
    let results = this.state.results

    for (let i = 0; i < results.length; i++) {
      let result = results[i]
      if (result.ClaimId === claimId) {
        result.IsPinned = newPinnedStatus
        break
      }
    }

    // Set remote pinnedStatus on the server
    return setPinnedStatus(claimId, newPinnedStatus)
      .then((response) => {
        return this.setState({
          results
        })
      })
  }

  redirect (url) {
    this.closeDropdown()

    if (this.context.router) {
      this.context.router.push(url)
    }
  }

  renderDropdown (results = []) {
    let patientName

    return (
      results.map((result) => {
        const claimId = result.ClaimId
        const claimUrl = `patientinfo?claimId=${claimId}`
        const activeStatusClass = result.IsActive ? 'search__result-active-status--active' : 'search__result-active-status--inactive'
        patientName = `${result.PatientFirstName} ${result.PatientLastName}`

        return (
          <div
            key={result.ClaimId}
            onClick={() => this.redirect(claimUrl)}
            className='search__result'>
            <div className='search__result-title'>
              <div className='search__result-patient-name'>{this.highlightKeyword(patientName, this.state.keyword)}</div>
              <div className='search__result-claim-number'>{this.highlightKeyword(result.ClaimNumber, this.state.keyword)}</div>
            </div>
            <div className={`search__result-active-status ${activeStatusClass}`}>{result.IsActive ? 'ACTIVE' : 'INACTIVE'}</div>
            <div className='search__result-pin-container'>
              <PinButton
                claimId={result.ClaimId}
                pinned={result.IsPinned}
                updatePinnedStatus={this.updatePinnedStatus}
              />
            </div>
          </div>
        )
      })
    )
  }

  render () {
    const results = this.state.results
    const resultCount = this.state.resultCount
    const showPlaceholder = this.state.showPlaceholder
    const openDropdown = this.state.openDropdown
    const resultLimit = this.props.resultLimit
    const showNumberResults = (resultCount > resultLimit)
    const showNoResults = this.state.showNoResults
    const showResults = results && results.length > 0
    const loading = this.state.loading

    return (
      <div
        ref={(searchBox) => { this.searchBox = searchBox }}
        onMouseEnter={this.onMouseEnterSearchBox}
        onMouseLeave={this.onMouseLeaveSearchBox}
        className='search'>
        <input
          className='search__input-box'
          type='text'
          disabled={loading}
          value={this.state.keyword}
          onChange={this.onChangeInput}
          onFocus={this.onFocusInput}
          ref={(input) => { this.searchInput = input }}
        />
        {
          loading &&
            <div className='search__loading-container'>
              <LoadingSpinner />
            </div>
        }
        {
          showPlaceholder &&
            (
              <div
                className='search__placeholder'
                onClick={this.clickPlaceholder}>
                <div className='search__placeholder-text'>
                  Search for <span className='bolden'>Claim Number</span> or <span className='bolden'>Patient Name</span>
                </div>
              </div>
            )
        }
        {
          openDropdown &&
            (
              <div className='search-dropdown__top-border' />
            )
        }
        {
          openDropdown &&
            (
              <div
                className='search-dropdown'>
                {
                  showNoResults &&
                    (
                      <div className='search_no-results-container'>
                        <div className='search_no-results-text'>No Results Found.</div>
                      </div>
                    )
                }
                {
                  showNumberResults &&
                    (
                      <div className='search__number-of-results'>
                        <div className='search__number-of-results-text'>
                          Showing <span className='search__result-limit'>{resultLimit}</span> of {resultCount} total results
                        </div>
                        <div className='search_number-of-results-seperator' />
                        <div className='search__see-all-link'>
                          See All
                        </div>
                      </div>
                    )
                }
                {
                  showResults &&
                    (
                      <div className='search__results-container'>
                        {this.renderDropdown(results)}
                      </div>
                    )
                }
                <div className='search__dropdown-buttons'>
                  <div className='search__view-all-claims'>
                    View all Active Claims
                  </div>
                  <div className='search__create-new-patient'>
                    Create New Patient
                  </div>
                </div>
              </div>
            )
        }
        <div className={(openDropdown) ? 'search__icon-container--active' : 'search__icon-container'}>
          <SearchIcon />
        </div>
      </div>
    )
  }
}

Search.contextTypes = {
  router: PropTypes.object
}

Search.defaultPropTypes = {
  minNumCharacters: 1,
  resultLimit: 0,
  debounceTime: 0
}

Search.propTypes = {
  minNumCharacters: PropTypes.number,
  resultLimit: PropTypes.number,
  debounceTime: PropTypes.number
}
