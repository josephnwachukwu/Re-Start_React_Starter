import React, { Component } from 'react'
import _ from 'lodash'

import { getClaimsList, setPinnedStatus } from './Api'

import Section from './Section'
import Subheader from './Subheader'
import LetterNav from './LetterNav'
import ColumnHeader from './ColumnHeader'
import UndoBar from '../Shared/UndoBar'
import LoadingSpinner from '../../theme/spinners/Animation-Loader.svg'

import './index.css'

export default class ClaimsList extends Component {
  constructor (props) {
    super(props)

    this.updatePinnedStatus = this.updatePinnedStatus.bind(this)
    this.showUndoBar = this.showUndoBar.bind(this)
    this.undoPin = this.undoPin.bind(this)
    this.closeUndoBar = this.closeUndoBar.bind(this)

    this.state = {
      claims: [],
      binnedClaims: {},
      loading: true,
      undo: {
        lastClaimId: '',
        lastPinnedState: true,
        showUndo: false
      }
    }
  }

  componentDidMount () {
    // TODO: DC 11-29-2016: Figure out where adjusterId will be coming from
    const adjusterId = 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b'

    getClaimsList(adjusterId)
      .then((response) => {
        this.setState({
          claims: response.Payload,
          binnedClaims: this.binClaims(response.Payload),
          loading: false
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

  showUndoBar () {
    const undoClaim = _.find(this.state.claims, (claim) => {
      return claim.ClaimSystemId === this.state.undo.lastClaimId
    })
    const undoPatientName = `${undoClaim.PatientFirstName} ${undoClaim.PatientLastName}`

    return (
      <UndoBar
        key={this.state.undo.lastClaimId}
        undoPatientName={undoPatientName}
        showUndo={this.state.undo.showUndo}
        undoAction={this.undoPin}
        closeUndoBar={this.closeUndoBar}
      />
    )
  }

  undoPin () {
    return this.updatePinnedStatus(this.state.undo.lastClaimId, !this.state.undo.lastPinnedState)
      .then(() => {
        this.closeUndoBar()
        this.setState({
          binnedClaims: this.binClaims(this.state.claims)
        })
      })
  }

  closeUndoBar () {
    this.setState({
      binnedClaims: this.binClaims(this.state.claims),
      undo: {
        lastClaimId: '',
        lastPinnedState: true,
        showUndo: false
      }
    })
  }

  updatePinnedStatus (claimId, pinnedStatus) {
    let claims = this.state.claims

    for (let i = 0; i < claims.length; i++) {
      let claim = claims[i]
      if (claim.ClaimSystemId === claimId) {
        claim.IsPinned = pinnedStatus
        break
      }
    }

    return setPinnedStatus(claimId, pinnedStatus)
      .then(() => {
        this.setState({
          undo: {
            showUndo: !pinnedStatus,
            lastClaimId: claimId,
            lastPinnedState: pinnedStatus
          },
          claims
        })
        if (pinnedStatus) {
          this.setState({
            binnedClaims: this.binClaims(claims)
          })
        }
      })
  }

  render () {
    const loading = this.state.loading
    let sortedTitles = _.without(Object.keys(this.state.binnedClaims).sort(), 'Pinned')
    sortedTitles.unshift('Pinned')

    if (loading) {
      return (
        <div className='claims-list-spinner-container'>
          <LoadingSpinner />
        </div>
      )
    } else {
      return (
        <div className='claims-list-container'>
          <Subheader
            claimCount={this.state.claims.length}
          />

          <LetterNav claims={this.state.binnedClaims} />
          <ColumnHeader />

          {
            sortedTitles.map((title) => {
              return (
                <Section
                  key={title}
                  title={title}
                  claims={this.state.binnedClaims[title]}
                  updatePinnedStatus={this.updatePinnedStatus}
                  undo={this.state.undo}
                  showUndoBar={this.showUndoBar}
                />
              )
            })
          }
        </div>
      )
    }
  }
}
