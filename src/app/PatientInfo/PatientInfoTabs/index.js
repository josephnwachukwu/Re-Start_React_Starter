import React, { Component, PropTypes } from 'react'
import format from 'date-fns/format'
import { find } from 'lodash'

import { stripTimezone } from '../../Shared/Utils'

import './index.css'

export default class PatientInfoTabs extends Component {
  constructor (props) {
    super(props)

    this.onTabClick = this.onTabClick.bind(this)
    this.renderContent = this.renderContent.bind(this)

    this.state = {
      selected: this.props.info[0].Title
    }
  }

  onTabClick (e) {
    e.preventDefault()
    this.setState({
      selected: e.target.textContent || e.target.innerText
    })
  }

  renderContent () {
    switch (this.state.selected) {
      case 'Injury':
        const injuryDetails = find(this.props.info, {Title: 'Injury'}).Details[0]
        const injuryDate = format(stripTimezone(injuryDetails.DOI), 'MMMM D, YYYY')
        return (
          <div className='patient-info-tabs__content'>
            <div className='patient-info-tabs__content--100'>
              <p className='patient-info-tabs__title'>Carrier</p>
              <p className='patient-info-tabs__details'>{injuryDetails.CarrierName}</p>
            </div>
            <div className='patient-info-tabs__content--100'>
              <p className='patient-info-tabs__title'>Carrier Branch</p>
              <p className='patient-info-tabs__details'>{injuryDetails.CarrierBranch}</p>
            </div>
            <div className='patient-info-tabs__section'>
              <div className='patient-info-tabs__content--50'>
                <p className='patient-info-tabs__title'>Date of Injury</p>
                <p className='patient-info-tabs__details patient-info-tabs__injury-date'>{injuryDate}</p>
              </div>
              <div className='patient-info-tabs__content--50'>
                <p className='patient-info-tabs__title'>State of Injury</p>
                <p className='patient-info-tabs__details'>{injuryDetails.StateOfInjury}</p>
              </div>
            </div>
            <div className='patient-info-tabs__content--100'>
              <p className='patient-info-tabs__title'>Injury</p>
              <p className='patient-info-tabs__details'>{injuryDetails.InjuryDescription}</p>
            </div>
            <div className='patient-info-tabs__content--100'>
              <p className='patient-info-tabs__title'>ICD Code</p>
              <p className='patient-info-tabs__details'>{injuryDetails.ICDCode}</p>
            </div>
          </div>
        )
      case 'Demographics':
        const demoDetails = find(this.props.info, {Title: 'Demographics'}).Details[0]
        const demoBirthday = format(stripTimezone(demoDetails.DOB), 'MMMM D, YYYY')
        return (
          <div className='patient-info-tabs__content'>
            <div className='patient-info-tabs__section'>
              <div className='patient-info-tabs__content--33'>
                <p className='patient-info-tabs__title'>Gender</p>
                <p className='patient-info-tabs__details'>{demoDetails.Gender}</p>
              </div>
              <div className='patient-info-tabs__content--33'>
                <p className='patient-info-tabs__title'>Height</p>
                <p className='patient-info-tabs__details'>{demoDetails.Height}</p>
              </div>
              <div className='patient-info-tabs__content--33'>
                <p className='patient-info-tabs__title'>Weight</p>
                <p className='patient-info-tabs__details'>{demoDetails.Weight}</p>
              </div>
            </div>
            <div className='patient-info-tabs__section'>
              <div className='patient-info-tabs__content--66'>
                <p className='patient-info-tabs__title'>Date of Birth</p>
                <p className='patient-info-tabs__details patient-info-tabs__birthday'>{demoBirthday}</p>
              </div>
              <div className='patient-info-tabs__content--33'>
                <p className='patient-info-tabs__title'>Age</p>
                <p className='patient-info-tabs__details'>{demoDetails.Age}</p>
              </div>
            </div>
            <div className='patient-info-tabs__content--100'>
              <p className='patient-info-tabs__title'>Address</p>
              <p className='patient-info-tabs__details'>{demoDetails.Address}</p>
            </div>
            <div className='patient-info-tabs__section'>
              <div className='patient-info-tabs__content--50'>
                <p className='patient-info-tabs__title'>City</p>
                <p className='patient-info-tabs__details'>{demoDetails.City}</p>
              </div>
              <div className='patient-info-tabs__content--25'>
                <p className='patient-info-tabs__title'>State</p>
                <p className='patient-info-tabs__details'>{demoDetails.State}</p>
              </div>
              <div className='patient-info-tabs__content--25'>
                <p className='patient-info-tabs__title'>Zip</p>
                <p className='patient-info-tabs__details'>{demoDetails.Zip}</p>
              </div>
            </div>
            <div className='patient-info-tabs__section'>
              <div className='patient-info-tabs__content--50'>
                <p className='patient-info-tabs__title'>Cell Phone</p>
                <p className='patient-info-tabs__details'>{demoDetails.CellPhone}</p>
              </div>
              <div className='patient-info-tabs__content--50'>
                <p className='patient-info-tabs__title'>Home Phone</p>
                <p className='patient-info-tabs__details'>{demoDetails.HomePhone}</p>
              </div>
            </div>
            <div className='patient-info-tabs__content--100'>
              <p className='patient-info-tabs__title'>Email</p>
              <p className='patient-info-tabs__details'>{demoDetails.EmailAddress}</p>
            </div>
            <div className='patient-info-tabs__content--100'>
              <p className='patient-info-tabs__title'>Language</p>
              <p className='patient-info-tabs__details'>{demoDetails.Language}</p>
            </div>
            <div className='patient-info-tabs__content--100'>
              <p className='patient-info-tabs__title'>Employer</p>
              <p className='patient-info-tabs__details'>{demoDetails.Employer}</p>
            </div>
          </div>
        )
      case 'Physician':
        const physDetails = find(this.props.info, {Title: 'Physician'}).Details[0]
        return (
          <div className='patient-info-tabs__content'>
            <div className='patient-info-tabs__content--100'>
              <p className='patient-info-tabs__title'>Referring / Ordering Physician Name</p>
              <p className='patient-info-tabs__details'>{physDetails.Name}</p>
            </div>
            <div className='patient-info-tabs__content--100'>
              <p className='patient-info-tabs__title'>Address</p>
              <p className='patient-info-tabs__details'>{physDetails.Address}</p>
            </div>
            <div className='patient-info-tabs__section'>
              <div className='patient-info-tabs__content--50'>
                <p className='patient-info-tabs__title'>City</p>
                <p className='patient-info-tabs__details'>{physDetails.City}</p>
              </div>
              <div className='patient-info-tabs__content--25'>
                <p className='patient-info-tabs__title'>State</p>
                <p className='patient-info-tabs__details'>{physDetails.State}</p>
              </div>
              <div className='patient-info-tabs__content--25'>
                <p className='patient-info-tabs__title'>Zip</p>
                <p className='patient-info-tabs__details'>{physDetails.Zip}</p>
              </div>
            </div>
            <div className='patient-info-tabs__content--100'>
              <p className='patient-info-tabs__title'>Phone</p>
              <p className='patient-info-tabs__details'>{physDetails.Phone}</p>
            </div>
            <div className='patient-info-tabs__content--100'>
              <p className='patient-info-tabs__title'>Email</p>
              <p className='patient-info-tabs__details'>{physDetails.EmailAddress}</p>
            </div>
          </div>
        )
      case 'Attorney':
        const attDetails = find(this.props.info, {Title: 'Attorney'}).Details[0]
        const attName = attDetails.AttorneyName.split('\n')
        return (
          <div className='patient-info-tabs__content'>
            <div className='patient-info-tabs__content--100'>
              <p className='patient-info-tabs__title'>Attorney Name</p>
              <p className='patient-info-tabs__details patient-info-tabs__attorney-name'>{attName[0]}</p>
              <p className='patient-info-tabs__details--secondary'>{attName[1]}</p>
            </div>
            <div className='patient-info-tabs__content--100'>
              <p className='patient-info-tabs__title'>Address</p>
              <p className='patient-info-tabs__details'>{attDetails.Address}</p>
            </div>
            <div className='patient-info-tabs__section'>
              <div className='patient-info-tabs__content--50'>
                <p className='patient-info-tabs__title'>City</p>
                <p className='patient-info-tabs__details'>{attDetails.City}</p>
              </div>
              <div className='patient-info-tabs__content--25'>
                <p className='patient-info-tabs__title'>State</p>
                <p className='patient-info-tabs__details'>{attDetails.State}</p>
              </div>
              <div className='patient-info-tabs__content--25'>
                <p className='patient-info-tabs__title'>Zip</p>
                <p className='patient-info-tabs__details'>{attDetails.Zip}</p>
              </div>
            </div>
            <div className='patient-info-tabs__content--100'>
              <p className='patient-info-tabs__title'>Phone</p>
              <p className='patient-info-tabs__details'>{attDetails.Phone}</p>
            </div>
            <div className='patient-info-tabs__content--100'>
              <p className='patient-info-tabs__title'>Email</p>
              <p className='patient-info-tabs__details'>{attDetails.EmailAddress}</p>
            </div>
          </div>
        )
    }
  }

  render () {
    return (
      <div className='patient-info-tabs'>
        <div className='patient-info-tabs__tabs'>
          {
            this.props.info.map((tab) => {
              return (
                <button
                  className={tab.Title === this.state.selected ? 'patient-info-tabs__tab-button--active' : 'patient-info-tabs__tab-button--' + tab.Title.toLowerCase()}
                  key={tab.Title}
                  onClick={this.onTabClick}>
                  {tab.Title}
                </button>
              )
            })
          }
        </div>
        {this.renderContent()}
      </div>
    )
  }
}

PatientInfoTabs.defaultProps = {
  info: [{
    Title: ''
  }]
}

PatientInfoTabs.propTypes = {
  info: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Details: PropTypes.shape.isRequired
    })
  )
}
