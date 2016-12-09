import React, { Component, PropTypes } from 'react'
import './index.css'

import Letter from './Letter'

export default class LetterNav extends Component {
  render () {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')

    const letters = alphabet.map((letter, i) => {
      const claims = this.props.claims || {}
      const sectionClaims = claims[letter] || []
      let disabled = Array.isArray(sectionClaims) ? sectionClaims.length === 0 : false

      return (
        <Letter
          key={i}
          title={letter}
          disabled={disabled}
        />
      )
    })

    return (
      <div className='grid'>
        <ul className='grid claims-navigation'>
          {letters}
        </ul>
      </div>
    )
  }
}

LetterNav.propTypes = {
  claims: PropTypes.object
}
