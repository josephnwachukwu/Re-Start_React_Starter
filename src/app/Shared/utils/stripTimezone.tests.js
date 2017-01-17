import { expect } from 'chai'
import { stripTimezone } from './index.js'

describe('stripTimezone utility method', function () {
  it('should return a date object with the expected timezone', function () {
    const inputDateTimeString = '2016-12-31T00:00:00.000Z' // zulu time
    const localTimezone = (new Date()).getTimezoneOffset()
    const actualDateObject = (new Date(stripTimezone(inputDateTimeString)))

    expect(actualDateObject.getTimezoneOffset()).to.equal(localTimezone)
  })
})
