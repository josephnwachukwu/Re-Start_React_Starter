import React, { PropTypes, Component } from 'react'
import { getClaimActions } from '../Api'
import format from 'date-fns/format'
import subDays from 'date-fns/sub_days'
import startWeek from 'date-fns/start_of_week'

import PatientActionCard from '../../Shared/PatientActionCard'

import LoadingSpinner from '../../../theme/spinners/Animation-Loader.svg'

import './index.css'

export default class PatientHistory extends Component {
  constructor (props) {
    super(props)

    this.renderDate = this.renderDate.bind(this)

    this.state = {
      actions: [],
      loading: true,
      expanded: props.expanded,
      values: props.selectedValues,
      update: false
    }
  }

  componentDidMount () {
    const claimId = 'f389d478-a64b-4693-b6ad-923bd6f24716'
    getClaimActions(claimId, [], [], format(subDays(Date(), 14), 'MM-DD-YYYY'), format(Date(), 'MM-DD-YYYY'))
      .then((response) => {
        this.setState({
          actions: response.Payload.Actions,
          loading: false,
          update: false
        })
      })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.expanded === this.props.expanded) {
      this.setState({
        loading: true,
        values: nextProps.selectedValues,
        update: true
      })
    } else {
      this.setState({
        expanded: nextProps.expanded,
        update: false
      })
    }
  }

  componentDidUpdate () {
    if (this.state.update) {
      const values = this.state.values
      const claimId = 'f389d478-a64b-4693-b6ad-923bd6f24716'
      getClaimActions(claimId, values.selectedType, values.selectedStatus, values.selectedDate[1], values.selectedDate[2])
        .then((response) => {
          this.setState({
            actions: response.Payload.Actions,
            update: false,
            loading: false
          })
        })
    }
  }

  renderDate (prevDate, currDate) {
    prevDate = format(startWeek(prevDate), 'MMMM Do, YYYY')
    currDate = format(startWeek(currDate), 'MMMM Do, YYYY')
    if (prevDate !== currDate) {
      return (
        <div className='patient-history__title'>
          <span>Week of {currDate}</span>
        </div>
      )
    }
  }

  render () {
    if (this.state.loading) {
      return (
        <div className='patient-history__spinner-container'>
          <LoadingSpinner />
        </div>
      )
    } else {
      return (
        <div>
          {
            this.state.actions.map((action, index) => {
              let prevDate = this.state.actions[index - 1] ? this.state.actions[index - 1].ActionDate : ''
              return (
                <div key={action.ActionId}>
                  {this.renderDate(prevDate, action.ActionDate)}
                  <PatientActionCard
                    expanded={this.state.expanded}
                    action={action}
                  />
                </div>
              )
            })
          }
          <div className='patient-history__footer' />
        </div>
      )
    }
  }
}

PatientHistory.defaultProps = {
  expanded: false,
  selectedValues: {
    selectedDate: ['', '', ''],
    selectedType: '',
    selectedStatus: ''
  }
}

PatientHistory.propTypes = {
  expanded: PropTypes.bool,
  selectedValues: PropTypes.shape({
    selectedDate: PropTypes.array.isRequired,
    selectedType: PropTypes.array.isRequired,
    selectedStatus: PropTypes.array.isRequired
  })
}
