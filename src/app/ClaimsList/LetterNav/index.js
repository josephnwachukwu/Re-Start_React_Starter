import React, { Component } from 'react'
import './index.css'

import Letter from '../letter'

export default class LetterNav extends Component {
  render () {
    const letters = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z'
    ].map((title, i) => <Letter key={i} title={title} />)

    return (
      <div className='grid'>
        <ul className='grid claims-navigation'>
          {letters}
        </ul>
      </div>
    )
  }
}
