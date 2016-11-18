import React, { Component, PropTypes } from 'react'

import Layout from './layout'
import Header from '../../components/header'
import Footer from '../../components/footer'
import ClaimCard from '../../components/claim_card'
import SideBar from '../../components/side_bar'

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
    function onClick () {
      alert('I was clicked')
    }

    const dropdown = [
      {key: 0, name: 'Profile', onClick},
      {key: 1, name: 'Logout', onClick}
    ]

    const { handleUpdate, props, state } = this
    return (
      <div>
        <Header name='Erica' fields={dropdown} />
        <Layout
          {...props}
          {...state}
          handleUpdate={handleUpdate}
        />
        <table>
          <tbody>
            <ClaimCard
              pinned={false}
              number='WC12312234234'
              name='Mitchelson, Sam'
              birthday='01/01/1980'
              injuryDate='01/01/2016'
              onClick={onClick}
            />
          </tbody>
        </table>
        <div className='grid'>
          <SideBar />
          <Layout
            {...props}
            {...state}
            handleUpdate={handleUpdate}
          />
        </div>
        <Footer />
      </div>
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
