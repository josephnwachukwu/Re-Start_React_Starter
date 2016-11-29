import React, { Component } from 'react'

import Section from './Section'
import Subheader from './Subheader'
import LetterNav from './LetterNav'

export default class ClaimsList extends Component {
  render () {
    function onClick () {
      alert('ClaimCard Clicked')
    }

    const cards = [
      {key: 0, card: {pinned: true, number: 'WC12312234234', name: 'Mitchelson, Sam', birthday: '01/01/1980', injuryDate: '01/01/2016'}, onClick},
      {key: 1, card: {pinned: true, number: 'WC12312234234', name: 'Guy, Justin', birthday: '01/01/1980', injuryDate: '01/01/2016'}, onClick},
      {key: 2, card: {pinned: true, number: 'WC12312234234', name: 'Russel, Nathan', birthday: '01/01/1980', injuryDate: '01/01/2016'}, onClick},
      {key: 3, card: {pinned: true, number: 'WC12312234234', name: 'Miller, Helen', birthday: '01/01/1980', injuryDate: '01/01/2016'}, onClick}
    ]

    return (
      <div>
        <Subheader />
        <LetterNav />
        <Section
          title='Pinned'
          cards={cards}
        />
      </div>
    )
  }
}

ClaimsList.propTypes = {
}
