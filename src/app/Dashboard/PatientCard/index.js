import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

import PatientActionCard from '../../Shared/PatientActionCard'
import QuickActions from './QuickActions'

import PinButton from '../../Shared/PinButton'

import Collapsed from '../../../theme/icons/PatientCard/Collapsed.svg'
import Expanded from '../../../theme/icons/PatientCard/Expanded.svg'

import './index.css'

export default class PatientCard extends Component {
  constructor (props) {
    super(props)

    this.toggleExpanded = this.toggleExpanded.bind(this)
    this.renderCards = this.renderCards.bind(this)
    this.renderView = this.renderView.bind(this)

    // Only keep numActions worth of actions
    let actions
    actions = _.take(props.claim.Actions, props.numActions)

    this.state = {
      actions: actions,
      expanded: props.expanded
    }
  }

  componentWillReceiveProps (props) {
    this.setState({
      expanded: props.expanded
    })
  }

  toggleExpanded () {
    this.setState({expanded: !this.state.expanded})
  }

  renderCards (layout) {
    if (this.state.expanded) {
      return (
        this.state.actions.map((action) => {
          return (
            <div key={action.ActionId}>
              <div className='patient-card__border' />
              <PatientActionCard
                action={action}
                layout={layout}
              />
            </div>
          )
        })
      )
    }
  }

  renderView () {
    const layout = this.props.layout
    const claimNum = this.props.claim.ClaimNumber
    const name = this.props.claim.PatientFirstName + ' ' + this.props.claim.PatientLastName
    const expanded = this.state.expanded

    if (layout === 'col') {
      return (
        <div className='grid__col-6 patient-card'>
          <div className='patient-card--col'>
            <div className='grid patient-card--col__header'>
              <div className='grid__col-1 patient-card--col__pin'>
                <PinButton
                  claimId={this.props.claim.ClaimSystemId}
                  pinned={this.props.claim.PinnedStatus}
                  updatePinnedStatus={this.props.updatePinnedStatus}
                />
              </div>
              <div className='grid__col-auto patient-card--col__title'>
                <span className='patient-card--col__name'>{name}</span>
                <span className='patient-card--col__num'>{claimNum}</span>
              </div>
            </div>
            <QuickActions
              expanded={expanded}
              toggleExpanded={this.toggleExpanded}
            />
            <div className='grid__col-12 patient-card--col__cards'>
              {this.renderCards(layout)}
            </div>
          </div>
        </div>
      )
    } else if (layout === 'row') {
      return (
        <div className='grid__col-12 patient-card'>
          <div className='patient-card--row'>
            <div className='grid patient-card--row__header'>
              <div className='grid__col-1 patient-card--row__pin'>
                <PinButton
                  claimId={this.props.claim.ClaimSystemId}
                  pinned={this.props.claim.PinnedStatus}
                  updatePinnedStatus={this.props.updatePinnedStatus}
                />
              </div>
              <div className='grid__col-auto patient-card--row__title'>
                <span className='patient-card--row__name'>{name}</span>
                <span className='patient-card--row__num'>{claimNum}</span>
              </div>
              <div className='grid__col-1 patient-card--row__icon' onClick={this.toggleExpanded}>
                {expanded ? <Expanded /> : <Collapsed />}
              </div>
            </div>
            <QuickActions
              expanded={expanded}
              toggleExpanded={this.toggleExpanded}
            />
            <div className='grid__col-12 patient-card--row__cards'>
              {this.renderCards(layout)}
            </div>
          </div>
        </div>
      )
    }
  }

  render () {
    return (this.renderView())
  }
}

PatientCard.defaultProps = {
  layout: 'row',
  claim: {}
}

PatientCard.propTypes = {
  numActions: PropTypes.string,
  layout: PropTypes.string,
  expanded: PropTypes.bool,
  claim: PropTypes.shape({
    ClaimNumber: PropTypes.string,
    ClaimSystemId: PropTypes.string,
    PatientFirstName: PropTypes.string,
    PatientLastName: PropTypes.string,
    PinnedStatus: PropTypes.bool,
    Actions: PropTypes.arrayOf(
      PropTypes.shape({
        ProductLine: PropTypes.string,
        ServiceType: PropTypes.string,
        Status: PropTypes.string,
        StatusDetail: PropTypes.string,
        ActionTitle: PropTypes.string,
        ActionDate: PropTypes.string,
        ActionId: PropTypes.string,
        ActionDetail: PropTypes.arrayOf(
          PropTypes.shape({
            Name: PropTypes.string,
            Value: PropTypes.string
          })
        )
      })
    )
  }),
  updatePinnedStatus: PropTypes.func
}
