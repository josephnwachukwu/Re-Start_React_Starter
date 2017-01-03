import React, { Component } from 'react'

import { getClaimActions, getMetrics } from './Api'

import PatientCard from './PatientCard'
import ViewSwitcher from './ViewSwitcher'
import LoadingSpinner from '../../theme/spinners/ring-alt-loader.svg'
import PatientCount from './PatientCount'

import './index.css'

export default class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.toggleCardExpanded = this.toggleCardExpanded.bind(this)
    this.toggleCardLayout = this.toggleCardLayout.bind(this)
    this.updatePinnedStatus = this.updatePinnedStatus.bind(this)

    this.state = {
      claims: [],
      loading: true,
      cardExpanded: true,
      cardLayout: 'col',
      metrics: {}
    }
  }

  componentDidMount () {
    // TODO: DC 12-12-2016: Figure out where adjusterId will be coming from

    const adjusterId = 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b'

    let getClaimsPromise = getClaimActions(adjusterId)
      .then((response) => {
        this.setState({
          claims: response.Payload
        })
      })

    let getMetricsPromise = getMetrics(adjusterId)
      .then((response) => {
        this.setState({
          metrics: response.Payload
        })
      })

    Promise.all([getClaimsPromise, getMetricsPromise])
      .then(() => {
        this.setState({
          loading: false
        })
      })
  }

  toggleCardExpanded () {
    this.setState({cardExpanded: !this.state.cardExpanded})
  }

  toggleCardLayout (layout) {
    this.setState({cardLayout: layout})
  }

  updatePinnedStatus (claimId, pinnedStatus) {
    let claims = this.state.claims

    for (let i = 0; i < claims.length; i++) {
      let claim = claims[i]
      if (claim.ClaimSystemId === claimId) {
        claim.PinnedStatus = pinnedStatus
        break
      }
    }

    this.setState({
      claims
    })
  }

  render () {
    const loading = this.state.loading
    const claims = this.state.claims
    const cardLayout = this.state.cardLayout
    const cardExpanded = this.state.cardExpanded
    const metrics = this.state.metrics

    if (loading) {
      return (
        <LoadingSpinner className='dashboard-container__loading-spinner' />
      )
    } else {
      return (
        <div className='dashboard-container'>
          <div className='dashboard-container__header'>
            <div className='grid'>
              <div className='grid__col-4'>
                <PatientCount
                  pinnedCount={metrics.PinnedClaimsCount}
                  totalCount={metrics.TotalClaimsCount}
                />
              </div>
              <div className='grid__col-8'>
                <ViewSwitcher
                  cardExpanded={cardExpanded}
                  cardLayout={cardLayout}
                  toggleCardExpanded={this.toggleCardExpanded}
                  toggleCardLayout={this.toggleCardLayout}
                />
              </div>
            </div>
          </div>
          <div className='dashboard-container__body'>
            <div className='grid'>
              {
                claims.map((claim) => {
                  if (claim.PinnedStatus === true) {
                    return (
                      <PatientCard
                        numActions='5'
                        layout={cardLayout}
                        expanded={cardExpanded}
                        claim={claim}
                        updatePinnedStatus={this.updatePinnedStatus}
                        key={claim.ClaimSystemId}
                      />
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
      )
    }
  }
}
