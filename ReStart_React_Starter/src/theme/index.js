import React, { Component, PropTypes } from 'react'

import 'sanitize.css/sanitize.css'
import 'reflex-grid'

export default class Theme extends Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

Theme.propTypes = {
  children: PropTypes.node
}
