import React, { Component } from 'react'

import { getClaimActions } from './Api'

import PatientActionCard from '../Shared/PatientActionCard'
import LoadingSpinner from '../../theme/spinners/ring-alt-loader.svg'

import './index.css'

export default class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      claims: [],
      loading: true
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

  render () {
    const loading = this.state.loading
    const claims = this.state.claims || []

    if (loading) {
      return (
        <LoadingSpinner className='dashboard-container__loading-spinner' />
      )
    } else {
      return (
        <div>
          <div>Dashboard Placeholder</div>
          {
            claims.map((claim) => {
              let actions = claim.Actions || []

              return actions.map((action) => {
                return (
                  <PatientActionCard
                    action={action}
                    key={action.ActionId}
                  />
                )
              })
            })
          }
        </div>
      )
    }
  }
}
