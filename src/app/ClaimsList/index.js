import React, { Component } from 'react'
import _ from 'lodash'

// import { getClaimsList } from './Api'
import mockData from './Api/mockData.json'

import Section from './Section'
import Subheader from './Subheader'
import LetterNav from './LetterNav'

export default class ClaimsList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      claims: [],
      binnedClaims: {}
    }
  }

  componentDidMount () {
    // TODO: DC 11-29-2016: Gets CORS issue sorted out so we can fetch
    // the mock data from the endpoint.
    // TODO: DC 11-29-2016: Figure out where adjusterId will be coming from

    // const adjusterId = '74653102-3a4e-41f0-937f-9e610a3d1ade'
    // console.log(getClaimsList(adjusterId))
    this.setState({
      claims: mockData.Payload,
      binnedClaims: this.binClaims(mockData.Payload)
    })
  }

  binClaims (claims = []) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')
    let binnedClaims = {
      Pinned: []
    }
    let letter
    let isPinned

    alphabet.forEach((letter) => {
      binnedClaims[letter] = []
    })

    claims.forEach((claim) => {
      letter = claim.PatientLastName[0].toUpperCase()
      isPinned = claim.IsPinned

      if (isPinned) {
        binnedClaims.Pinned.push(claim)
      }

      binnedClaims[letter].push(claim)
    })

    return binnedClaims
  }

  render () {
    let sortedTitles = _.without(Array.sort(Object.keys(this.state.binnedClaims)), 'Pinned')
    sortedTitles.unshift('Pinned')

    return (
      <div>
        <Subheader
          claimCount={this.state.claims.length}
        />
        <LetterNav
          claims={this.state.binnedClaims}
        />
        {
          sortedTitles.map((title) => {
            return (
              <Section
                key={title}
                title={title}
                claims={this.state.binnedClaims[title]}
              />
            )
          })
        }
      </div>
    )
  }
}

ClaimsList.propTypes = {
}
