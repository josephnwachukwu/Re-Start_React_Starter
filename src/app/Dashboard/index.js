import React, { Component } from 'react'

import { getClaimActions } from './Api'

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

    this.state = {
      claims: [],
      loading: true,
      cardExpanded: true,
      cardLayout: 'col'
    }
  }

  componentDidMount () {
    // TODO: DC 12-12-2016: Figure out where adjusterId will be coming from

    const adjusterId = 'fdbdd892-8dd8-4fbf-8ea7-8c2dbdb40b2b'
    getClaimActions(adjusterId)
      .then((response) => {
        this.setState({
          claims: response.Payload,
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

  render () {
    const loading = this.state.loading
    const claims = this.state.claims
    const cardLayout = this.state.cardLayout
    const cardExpanded = this.state.cardExpanded

    if (loading) {
      return (
        <LoadingSpinner className='dashboard-container__loading-spinner' />
      )
    } else {
      return (
        <div className='dashbord-container'>
          <div className='dashbord-container__header'>
            <div className='grid'>
              <div className='grid__col-4'>
                <PatientCount
                  pinnedCount={26}
                  totalCount={150}
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
                  return (
                    <PatientCard
                      numActions='5'
                      layout={cardLayout}
                      expanded={cardExpanded}
                      claim={claim}
                      key={claim.ClaimSystemId}
                    />
                  )
                })
              }
            </div>
          </div>
        </div>
      )
    }
  }
}
