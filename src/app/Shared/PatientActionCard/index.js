import React, { Component, PropTypes } from 'react'
import format from 'date-fns/format'
import { stripTimezone } from '../../Shared/Utils'

import Diagnostics from '../../../theme/icons/Diagnostics.svg'
import HomeHealth from '../../../theme/icons/Home-Health.svg'
import PhysicalMedicine from '../../../theme/icons/Physical-Medicine.svg'
import Transportation from '../../../theme/icons/Transportation.svg'

import DiagnosticsActive from '../../../theme/icons/Diagnostics-Active.svg'
import HomeHealthActive from '../../../theme/icons/Home-Health-Active.svg'
import PhysicalMedicineActive from '../../../theme/icons/Physical-Medicine-Active.svg'
import TransportationActive from '../../../theme/icons/Transportation-Active.svg'

import TemporaryIcon from '../../../theme/icons/Temporary-Icon.svg'

import Canceled from '../../../theme/icons/Status-Canceled.svg'
import Completed from '../../../theme/icons/Status-Completed.svg'
import Missed from '../../../theme/icons/Status-Missed.svg'
import Pending from '../../../theme/icons/Status-Pending.svg'

import Plus from '../../../theme/icons/ExpansionPlus.svg'
import Minus from '../../../theme/icons/CompressionMinus.svg'

import './index.css'

export default class PatientActionCard extends Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
    this.getIcon = this.getIcon.bind(this)
    this.getStatusIcon = this.getStatusIcon.bind(this)
    this.getDropdownIcon = this.getDropdownIcon.bind(this)
    this.renderDropdown = this.renderDropdown.bind(this)
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
    // TODO: implement additional icons
    switch (productLine) {
      case 'DIAGNOSTICS': return (this.state.dropdownActive ? <DiagnosticsActive /> : <Diagnostics />)
      case 'HOME HEALTH': return (this.state.dropdownActive ? <HomeHealthActive /> : <HomeHealth />)
      case 'PHYSICAL MEDICINE': return (this.state.dropdownActive ? <PhysicalMedicineActive /> : <PhysicalMedicine />)
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
    return this.state.dropdownActive ? <Minus /> : <Plus />
  }

  renderDropdown (actionDetail) {
    if (this.state.dropdownActive) {
      return (
        <div className='grid action-card__dropdown'>
          {
            actionDetail.map((field, index) => {
              return (
                <div className='grid' key={index}>
                  <div className='grid__col-4'>
                    <span className='action-card__dropdown-tag'>
                      {field.Name}
                    </span>
                  </div>
                  <div className='grid__col-6'>
                    <span className='action-card__dropdown-content'>
                      {field.Value}
                    </span>
                  </div>
                </div>
              )
            })
          }
        </div>
      )
    }
  }

  render () {
    const action = this.props.action
    const status = action.Status.toUpperCase()
    const date = stripTimezone(action.ActionDate)
    const month = format(date, 'MMM')
    const day = format(date, 'D')

    return (
      <div className={this.state.dropdownActive ? 'grid action-card--active' : 'grid action-card'}>
        <div className='grid__col-1 action-card__icon'>
          <div className={this.state.dropdownActive ? 'action-card__triangle' : ''} />
          <a>{this.getIcon(action.ProductLine)}</a>
        </div>
        <div className='grid__col-1 action-card__date'>
          <span className='action-card__month'>{month.toUpperCase()}</span>
          <span className='action-card__day'>{day}</span>
        </div>
        <div className='grid__col-auto action-card__body'>
          <div className='action-card__title'>
            {action.ActionTitle}
          </div>
          <div className='action-card__button' onClick={this.onClick}>
            <a>{this.getDropdownIcon()}</a>
          </div>
          <div className='action-card__tag'>
            <span>{status}</span>
          </div>
          <div className='action-card__status'>
            <a>{this.getStatusIcon(status)}</a>
          </div>
        </div>
        {this.renderDropdown(action.ActionDetail)}
      </div>
    )
  }
}

PatientActionCard.propTypes = {
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
