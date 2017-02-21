import React, { Component, PropTypes } from 'react'

import DatePicker from '../../DatePicker'

export default class Date extends Component {
  render () {
    const selection = this.props.selection
    const onChange = this.props.onChange
    const status = this.props.status
    const label = this.props.label
    const enableTime = this.props.enableTime

    return (
      <div className='date-input'>
        <DatePicker
          selection={selection}
          onChange={onChange}
          status={status}
          label={label}
          enableTime={enableTime}
        />
      </div>
    )
  }
}

Date.defaultProps = {
  status: '',
  selection: ''
}

Date.propTypes = {
  selection: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  status: PropTypes.string,
  label: PropTypes.string,
  enableTime: PropTypes.bool
}
