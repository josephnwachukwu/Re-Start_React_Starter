import React, { Component, PropTypes } from 'react'
import format from 'date-fns/format'

import { stripTimezone } from '../../Shared/Utils'

import Dental from '../../../theme/icons/PatientCard/Dental.svg'
import Diagnostics from '../../../theme/icons/PatientCard/Diagnostics.svg'
import EDM from '../../../theme/icons/PatientCard/EDM.svg'
import HomeHealth from '../../../theme/icons/PatientCard/Home-Health.svg'
import Language from '../../../theme/icons/PatientCard/Language.svg'
import PhysicalMedicine from '../../../theme/icons/PatientCard/Physical-Medicine.svg'
import Quote from '../../../theme/icons/PatientCard/Quote.svg'
import Report from '../../../theme/icons/PatientCard/Report.svg'
import Transportation from '../../../theme/icons/PatientCard/Transportation.svg'

import DentalActive from '../../../theme/icons/PatientCard/Dental-Active.svg'
import DiagnosticsActive from '../../../theme/icons/PatientCard/Diagnostics-Active.svg'
import EDMActive from '../../../theme/icons/PatientCard/EDM-Active.svg'
import HomeHealthActive from '../../../theme/icons/PatientCard/Home-Health-Active.svg'
import LanguageActive from '../../../theme/icons/PatientCard/Language-Active.svg'
import PhysicalMedicineActive from '../../../theme/icons/PatientCard/Physical-Medicine-Active.svg'
import QuoteActive from '../../../theme/icons/PatientCard/Quote-Active.svg'
import ReportActive from '../../../theme/icons/PatientCard/Report-Active.svg'
import TransportationActive from '../../../theme/icons/PatientCard/Transportation-Active.svg'

import TemporaryIcon from '../../../theme/icons/Temporary-Icon.svg'

import Canceled from '../../../theme/icons/Status-Canceled.svg'
import Completed from '../../../theme/icons/Status-Completed.svg'
import Missed from '../../../theme/icons/Status-Missed.svg'
import Pending from '../../../theme/icons/Status-Pending.svg'

import Plus from '../../../theme/icons/Plus-Expansion.svg'
import Minus from '../../../theme/icons/Minus-Compression.svg'

import './index.css'

export default class PatientActionCard extends Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.getIcon = this.getIcon.bind(this)
    this.getStatusIcon = this.getStatusIcon.bind(this)
    this.getDropdownIcon = this.getDropdownIcon.bind(this)
    this.renderDropdown = this.renderDropdown.bind(this)
    this.renderView = this.renderView.bind(this)
    this.state = {
      dropdownActive: false
    }
  }

  onClick () {
    this.setState({
      dropdownActive: !this.state.dropdownActive
    })
  }

  getIcon (productLine) {
    switch (productLine.toUpperCase()) {
      case 'DENTAL': return (this.state.dropdownActive ? <DentalActive /> : <Dental />)
      case 'DIAGNOSTICS': return (this.state.dropdownActive ? <DiagnosticsActive /> : <Diagnostics />)
      case 'EQUIPMENT & DEVICES': return (this.state.dropdownActive ? <EDMActive /> : <EDM />)
      case 'HOME HEALTH CARE': return (this.state.dropdownActive ? <HomeHealthActive /> : <HomeHealth />)
      case 'LANGUAGE': return (this.state.dropdownActive ? <LanguageActive /> : <Language />)
      case 'PHYSICAL MEDICINE': return (this.state.dropdownActive ? <PhysicalMedicineActive /> : <PhysicalMedicine />)
      case 'QUOTE': return (this.state.dropdownActive ? <QuoteActive /> : <Quote />)
      case 'REPORT': return (this.state.dropdownActive ? <ReportActive /> : <Report />)
      case 'TRANSPORTATION': return (this.state.dropdownActive ? <TransportationActive /> : <Transportation />)
      default: return <TemporaryIcon />
    }
  }

  getStatusIcon (status) {
    switch (status) {
      case 'COMPLETED': return <Completed />
      case 'SUBMITTED': return <Completed />
      case 'PENDING': return <Pending />
      case 'PROCESSED': return <Pending />
      case 'CANCELED': return <Canceled />
      case 'MISSED': return <Missed />
      default: return ''
    }
  }

  getDropdownIcon () {
    return this.state.dropdownActive ? <Plus /> : <Minus />
  }

  renderDropdown (actionDetail) {
    if (this.state.dropdownActive && actionDetail) {
      return (
        <div className='grid__col-12 patient-action-card__dropdown'>
          <div className='patient-action-card__dropdown-border' />
          {
            actionDetail.map((field, index) => {
              return (
                <div className='grid patient-action-card__dropdown-card' key={index}>
                  <div className='grid__col-2 patient-action-card__dropdown-padding' />
                  <div className='grid__col-3 patient-action-card__dropdown-tag'>
                    {field.Name}
                  </div>
                  <div className='grid__col-auto patient-action-card__dropdown-content'>
                    {field.Value}
                  </div>
                </div>
              )
            })
          }
        </div>
      )
    }
  }

  renderView () {
    const layout = this.props.layout
    const action = this.props.action
    const status = action.Status.toUpperCase()
    const date = stripTimezone(action.ActionDate)
    const month = format(date, 'MMM')
    const day = format(date, 'D')

    if (layout === 'col') {
      return (
        <div className={this.state.dropdownActive ? 'grid patient-action-card--active' : 'grid patient-action-card'}>
          <div className='grid--align-self-stretch__col-1 patient-action-card__icon'>
            <div className={this.state.dropdownActive ? 'patient-action-card__triangle-icon' : ''} />
            <div className='patient-action-card__product-icon'>{this.getIcon(action.ProductLine)}</div>
          </div>
          <div className='grid__col-1 patient-action-card__date'>
            <span className='patient-action-card__month'>{month.toUpperCase()}</span>
            <span className='patient-action-card__day'>{day}</span>
          </div>
          <div className='grid__col-auto patient-action-card__body'>
            <div className='grid__col-8 patient-action-card__title'>
              {action.ActionTitle}
            </div>
            <div className='patient-action-card--col__status'>
              <div>{this.getStatusIcon(status)}</div>
            </div>
          </div>
          <div className='grid__col-1 patient-action-card__button' onClick={this.onClick}>
            {this.getDropdownIcon()}
          </div>
          {this.renderDropdown(action.ActionDetail)}
        </div>
      )
    } else if (layout === 'row') {
      return (
        <div className={this.state.dropdownActive ? 'grid patient-action-card--active' : 'grid patient-action-card'}>
          <div className='grid--align-self-stretch__col-1 patient-action-card__icon'>
            <div className={this.state.dropdownActive ? 'patient-action-card__triangle-icon' : ''} />
            <div className='patient-action-card__product-icon'>{this.getIcon(action.ProductLine)}</div>
          </div>
          <div className='grid__col-1 patient-action-card__date'>
            <span className='patient-action-card__month'>{month.toUpperCase()}</span>
            <span className='patient-action-card__day'>{day}</span>
          </div>
          <div className='grid__col-auto patient-action-card__body'>
            <div className='grid__col-6 patient-action-card__title'>
              {action.ActionTitle}
            </div>
            <div className='patient-action-card__tag'>
              <span>{status}</span>
            </div>
            <div className='patient-action-card--row__status'>
              <div>{this.getStatusIcon(status)}</div>
            </div>
          </div>
          <div className='grid__col-1 patient-action-card__button' onClick={this.onClick}>
            <a>{this.getDropdownIcon()}</a>
          </div>
          {this.renderDropdown(action.ActionDetail)}
        </div>
      )
    }
  }

  render () {
    return (
      <div className='patient-action-card-container'>
        {this.renderView()}
      </div>
    )
  }
}

PatientActionCard.defaultProps = {
  layout: 'row'
}

PatientActionCard.propTypes = {
  layout: PropTypes.string,
  action: PropTypes.shape({
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
}
