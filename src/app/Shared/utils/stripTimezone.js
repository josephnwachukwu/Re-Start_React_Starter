export default (isoDateString = (new Date()).toISOString()) => {
  let date = isoDateString.split('T')[0]
  let time = isoDateString.split('T')[1]
  time = time.split(':')
  date = date.split('-')

  return new Date(
    parseInt(date[0]), // year
    parseInt(date[1]) - 1, // month
    parseInt(date[2]), // day
    parseInt(time[0]), // hour
    parseInt(time[1]), // min
    0 // sec
  )
}
