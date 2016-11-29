import React, { Component } from 'react'

import ClaimCard from './ClaimCard'
import Subheader from './Subheader'
import LetterNav from './LetterNav'

export default class ClaimsList extends Component {
  render () {
    function onClick () {
      alert('ClaimCard Clicked')
    }

    const card = {
      pinned: false,
      number: 'WC12312234234',
      name: 'Mitchelson, Sam',
      birthday: '01/01/1980',
      injuryDate: '01/01/2016'
    }

    return (
      <div>
        <Subheader />
        <LetterNav />
        <ClaimCard
          card={card}
          onClick={onClick}
        />
      </div>
    )
  }
}

ClaimsList.propTypes = {
}
