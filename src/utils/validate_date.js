import { format, parse, isValid, isToday, isFuture, isAfter, addDays } from 'date-fns'
import { MAX_DATE } from '../constants'

export default (value, callback) => {
  let error
  const date = parse(value)

  // is falsey
  if (!value) return callback(error, '')

  // bad format
  if (!isValid(date)) return callback(error, value)

  // in the past
  if (!isFuture(date) && !isToday(date)) {
    return callback({message: 'In the past'}, value)
  }

  // too far in the future
  if (!isAfter(addDays(new Date(), MAX_DATE), date)) {
    return callback({message: 'Too far in the future'}, value)
  }

  // OK
  return callback(error, format(date, 'MMM D, YYYY'))
}
