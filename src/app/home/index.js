import React, { Component, PropTypes } from 'react'

import Layout from './layout'

class Home extends Component {

  constructor (props) {
    super(props)
    const { firstName } = props
    this.state = { firstName }
    this.setState = this.setState.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate (update) {
    this.setState(update)
  }

  render () {
    const { handleUpdate, props, state } = this
    return (
      <Layout
        {...props}
        {...state}
        handleUpdate={handleUpdate}
      />
    )
  }
}

Home.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  age: PropTypes.string,
  ageError: PropTypes.object
}

export default Home
