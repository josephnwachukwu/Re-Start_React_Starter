import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import LetterNav from './index.js'
import Letter from './Letter'

describe('Letter Nav component', function () {
  it('disables navigation for empty sections', function () {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('')
    let binnedClaims = {}
    let claimsCheck = 0

    alphabet.forEach((letter) => {
      binnedClaims[letter] = []
    })

    shallow(<LetterNav claims={binnedClaims} />).find(Letter).forEach((letter) => {
      if (letter.props().disabled === true) {
        claimsCheck++
      }
    })

    expect(claimsCheck).to.equal(26)
  })
})
