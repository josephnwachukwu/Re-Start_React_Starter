import React, { Component, PropTypes } from 'react'

import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'

import './index.css'

export default class DatePicker extends Component {

  render () {
    const onChange = this.props.onChange
    const options = this.props.options
    return (
      <div>
        <Flatpickr
          onChange={onChange}
          options={options} />
      </div>
    )
  }
}

DatePicker.defaultProps = {
  onChange: {},
  options: {
    nextArrow: '<svg width="10px" height="16px" viewBox="0 0 10 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Arrow---Right" fill="#2D7DAB"><polygon id="Rectangle-15" transform="translate(5.000000, 8.000000) rotate(90.000000) translate(-5.000000, -8.000000) " points="-3 11 5 3 13 11 11 13 5 7 -1 13"></polygon></g></g></svg>',
    prevArrow: '<svg width="10px" height="16px" viewBox="0 0 10 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Arrow---Left" fill="#2D7DAB"><polygon id="Rectangle-15" transform="translate(5.000000, 8.000000) rotate(-90.000000) translate(-5.000000, -8.000000) " points="-3 11 5 3 13 11 11 13 5 7 -1 13"></polygon></g></g></svg>'
  }
}

DatePicker.propTypes = {
  onChange: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired
}
