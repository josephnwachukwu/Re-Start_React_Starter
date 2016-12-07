import React, { Component } from 'react'
import _ from 'lodash'

import { getClaimsList } from './Api'

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
    // TODO: DC 11-29-2016: Figure out where adjusterId will be coming from

    const adjusterId = 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b'
    getClaimsList(adjusterId)
      .then((response) => {
        this.setState({
          claims: response.Payload,
          binnedClaims: this.binClaims(response.Payload)
        })
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
    let sortedTitles = _.without(Object.keys(this.state.binnedClaims).sort(), 'Pinned')
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
