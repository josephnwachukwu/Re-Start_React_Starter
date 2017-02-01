import React, { Component, PropTypes } from 'react'
import { getPatientInfo, getDropdownData } from './Api'
import format from 'date-fns/format'
import subDays from 'date-fns/sub_days'

import PatientHeader from './PatientHeader'
import PatientInfoTabs from './PatientInfoTabs'
import PatientHistoryFilter from './PatientHistoryFilter'
import PatientHistory from './PatientHistory'

import LoadingSpinner from '../../theme/spinners/Animation-Loader.svg'

import './index.css'

export default class PatientInfo extends Component {
  constructor (props) {
    super(props)

    this.toggleCardExpanded = this.toggleCardExpanded.bind(this)
    this.getSelectedValues = this.getSelectedValues.bind(this)

    let dates = ['14 Days']
    dates.push(format(subDays(Date(), 14), 'MM-DD-YYYY'))
    dates.push(format(Date(), 'MM-DD-YYYY'))

    this.state = {
      claimInfo: [],
      dropdownData: [],
      loading: true,
      claimId: props.location.query.claimId,
      cardExpanded: false,
      selectedValues: {
        selectedDate: dates,
        selectedType: [],
        selectedStatus: []
      }
    }
  }

  toggleCardExpanded () {
    this.setState({cardExpanded: !this.state.cardExpanded})
  }

  getSelectedValues (filters) {
    this.setState({selectedValues: filters})
  }

  componentDidMount () {
    let getPatientPromise = getPatientInfo(this.state.claimId)
      .then((response) => {
        this.setState({
          claimInfo: response.Payload
        })
      })

    let getDropdownDataPromise = getDropdownData()
      .then((response) => {
        this.setState({
          dropdownData: response
        })
      })

    Promise.all([getPatientPromise, getDropdownDataPromise])
      .then(() => {
        this.setState({
          loading: false
        })
      })
  }

  render () {
    const loading = this.state.loading
    const claimInfo = this.state.claimInfo || []

    if (loading) {
      return (
        <div className='patient-info-spinner-container'>
          <LoadingSpinner />
        </div>
      )
    } else {
      return (
        <div className='patient-info'>
          <PatientHeader
            patientFirstName={claimInfo.PatientFirstName}
            patientLastName={claimInfo.PatientLastName}
            claimNumber={claimInfo.ClaimNumber}
          />
          <div className='patient-info-tab'>
            <PatientInfoTabs info={claimInfo.Info} />
          </div>
          <div className='patient-info-container'>
            <PatientHistoryFilter
              dropdownData={this.state.dropdownData}
              expanded={this.state.cardExpanded}
              selectedValues={this.state.selectedValues}
              toggleCardExpanded={this.toggleCardExpanded}
              onFormSubmit={this.getSelectedValues}
            />
            <PatientHistory
              expanded={this.state.cardExpanded}
              selectedValues={this.state.selectedValues}
              claimId={this.state.claimId}
            />
          </div>
        </div>
      )
    }
  }
}

PatientInfo.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      claimId: PropTypes.string.isRequired
    })
  })
}
