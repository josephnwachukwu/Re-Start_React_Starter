import React, { PropTypes, Component } from 'react'
import format from 'date-fns/format'
import subDays from 'date-fns/sub_days'
import isBefore from 'date-fns/is_before'

import MultiDropdown from '../../Shared/MultiSelectDropdown'
import DatePicker from '../../Shared/DatePicker'

import CalendarIcon from '../../../theme/icons/Calendar-History-Filter.svg'

import './index.css'

export default class PatientHistoryFilter extends Component {
  constructor (props) {
    super(props)

    this.changeDate = this.changeDate.bind(this)
    this.changeType = this.changeType.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
    this.displayDate = this.displayDate.bind(this)
    this.renderDatePicker = this.renderDatePicker.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onFirstCustomDateChange = this.onFirstCustomDateChange.bind(this)
    this.onLastCustomDateChange = this.onLastCustomDateChange.bind(this)

    let status = []
    let type = []

    props.dropdownData.map((data) => {
      data.ResourceValueDetails.map((details) => {
        if (data.Type === 'ClaimActionStatus') {
          status.push({value: details.Id, label: details.Value})
        } else if (data.Type === 'ProductLine') {
          type.push({value: details.Id, label: details.Value})
        }
      })
    })

    this.state = {
      selectedDate: props.selectedValues.selectedDate[0],
      selectedType: [],
      selectedStatus: [],
      typeDropdown: type,
      statusDropdown: status,
      customDates: ['', ''],
      customDatesValid: [true, true]
    }
  }

  changeDate (e) {
    this.setState({
      selectedDate: e.target.textContent || e.target.innerText,
      customDates: ['', ''],
      customDatesValid: [true, true]
    })
  }

  changeType (type) {
    this.setState({
      selectedType: type
    })
  }

  changeStatus (status) {
    this.setState({
      selectedStatus: status
    })
  }

  displayDate () {
    const selectedDate = this.props.selectedValues.selectedDate
    switch (selectedDate[0]) {
      case '14 Days':
        return 'Last 14 Days'
      case '30 Days':
        return 'Last 30 Days'
      case '60 Days':
        return 'Last 60 Days'
      case 'Custom':
        return selectedDate[1] + ' - ' + selectedDate[2]
      default:
        return 'Unknown Date'
    }
  }

  onFormSubmit () {
    let dates = [this.state.selectedDate]
    let valid = true
    switch (this.state.selectedDate) {
      case '14 Days':
        dates.push(format(subDays(Date(), 14), 'MM-DD-YYYY'))
        dates.push(format(Date(), 'MM-DD-YYYY'))
        break
      case '30 Days':
        dates.push(format(subDays(Date(), 30), 'MM-DD-YYYY'))
        dates.push(format(Date(), 'MM-DD-YYYY'))
        break
      case '60 Days':
        dates.push(format(subDays(Date(), 60), 'MM-DD-YYYY'))
        dates.push(format(Date(), 'MM-DD-YYYY'))
        break
      case 'Custom':
        const customDates = this.state.customDates
        const firstValid = customDates[0] !== '' && customDates[0] !== 'NaN-NaN-0NaN'
        const lastValid = customDates[1] !== '' && customDates[1] !== 'NaN-NaN-0NaN'

        this.setState({
          customDatesValid: [firstValid, lastValid]
        })

        if (!firstValid || !lastValid) {
          valid = false
          break
        }

        if (isBefore(customDates[0], customDates[1])) {
          dates.push(customDates[0])
          dates.push(customDates[1])
        } else {
          dates.push(customDates[1])
          dates.push(customDates[0])
        }

        break
      default:
        return 'Unknown Date'
    }

    if (valid) {
      let type = []
      this.state.selectedType.map((data) => {
        type.push(data.value)
      })

      let status = []
      this.state.selectedStatus.map((data) => {
        status.push(data.value)
      })

      let values = {
        selectedDate: dates,
        selectedType: type,
        selectedStatus: status
      }

      this.props.onFormSubmit(values)
    }
  }

  onFirstCustomDateChange (date) {
    let dates = this.state.customDates
    dates[0] = format(date[0], 'MM / DD / YYYY')
    const firstValid = dates[0] !== '' && dates[0] !== 'NaN-NaN-0NaN'

    this.setState({
      customDates: dates,
      customDatesValid: [firstValid, this.state.customDatesValid[1]]
    })
  }

  onLastCustomDateChange (date) {
    let dates = this.state.customDates
    dates[1] = format(date[0], 'MM / DD / YYYY')
    const lastValid = dates[1] !== '' && dates[1] !== 'NaN-NaN-0NaN'
    this.setState({
      customDates: dates,
      customDatesValid: [this.state.customDatesValid[0], lastValid]
    })
  }

  renderDatePicker () {
    if (this.state.selectedDate === 'Custom') {
      const options = {
        dateFormat: 'm / d / Y'
      }

      return (
        <div className='patient-history-filter__custom-date'>
          <div className={this.state.customDatesValid[0] ? 'patient-history-filter__custom-date-input' : 'patient-history-filter__invalid-date'}>
            <DatePicker
              onChange={this.onFirstCustomDateChange}
              options={options}
              placeholder='MM / DD / YYYY' />
            <CalendarIcon className='patient-history-filter__calendar-icon' />
          </div>
          <span className='patient-history-filter__custom-date-to'>To</span>
          <div className={this.state.customDatesValid[1] ? 'patient-history-filter__custom-date-input' : 'patient-history-filter__invalid-date'}>
            <DatePicker
              onChange={this.onLastCustomDateChange}
              options={options}
              placeholder='MM / DD / YYYY' />
            <CalendarIcon className='patient-history-filter__calendar-icon' />
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      <div className='patient-history-filter'>
        <div className='patient-history-filter__filters'>
          <div className='patient-history-filter__show-last'>
            <div className='patient-history-filter__label'>Show Last:</div>
            <button
              className={this.state.selectedDate === '14 Days' ? 'patient-history-filter__show-last-buttons--first-active' : 'patient-history-filter__show-last-buttons--first'}
              onClick={this.changeDate}>
              14 Days
            </button>
            <button
              className={this.state.selectedDate === '30 Days' ? 'patient-history-filter__show-last-buttons--active' : 'patient-history-filter__show-last-buttons'}
              onClick={this.changeDate}>
              30 Days
            </button>
            <button
              className={this.state.selectedDate === '60 Days' ? 'patient-history-filter__show-last-buttons--active' : 'patient-history-filter__show-last-buttons'}
              onClick={this.changeDate}>
              60 Days
            </button>
            <button
              className={this.state.selectedDate === 'Custom' ? 'patient-history-filter__show-last-buttons--last-active' : 'patient-history-filter__show-last-buttons--last'}
              onClick={this.changeDate}>
              Custom
            </button>
            <div className='patient-history-filter__date-picker'>
              {this.renderDatePicker()}
            </div>
          </div>
          <div className='patient-history-filter__dropdown'>
            <div className='patient-history-filter__type'>
              <MultiDropdown
                label='Type:'
                placeholder='All'
                value={this.state.selectedType}
                options={this.state.typeDropdown}
                onChange={this.changeType} />
            </div>
            <div className='patient-history-filter__status'>
              <MultiDropdown
                label='Status:'
                placeholder='All'
                value={this.state.selectedStatus}
                options={this.state.statusDropdown}
                onChange={this.changeStatus}
              />
            </div>
          </div>
          <button
            className='patient-history-filter__apply-button'
            onClick={this.onFormSubmit}>
            Apply
          </button>
        </div>
        <div className='patient-history-filter__showing'>
          <span className='patient-history-filter__showing-label'>Showing: </span>
          <span className='patient-history-filter__showing-date'>{this.displayDate()}</span>
          <button
            className='patient-history-filter__showing-button'
            onClick={this.props.toggleCardExpanded}>
            {this.props.expanded ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>
    )
  }
}

PatientHistoryFilter.defaultProps = {
  dropdownData: [],
  expanded: false,
  selectedValues: ({
    selectedDate: ['14 Days']
  }),
  toggleCardExpanded: () => {},
  onFormSubmit: () => {}
}

PatientHistoryFilter.propTypes = {
  dropdownData: PropTypes.array.isRequired,
  expanded: PropTypes.bool.isRequired,
  selectedValues: PropTypes.shape({
    selectedDate: PropTypes.array.isRequired
  }),
  toggleCardExpanded: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired
}
