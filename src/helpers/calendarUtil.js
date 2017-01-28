import moment from 'moment'

import { NUMBER_OF_DAYS } from '../defaults'
import { chunk, countMap } from './util'

export const timePercentage = (time) => {
  const timeMoment = moment(time)
  const hour = timeMoment.hour()
  const minute = timeMoment.minute()

  const percent = ((((60 * hour) + minute) - (7 * 60)) * 100) / (14 * 60)
  return percent
}

export const durationPercentage = (duration) => {
  const percent = ((duration || 1 * 60 * 60 * 1000) * 100) / (24 * 60 * 60 * 1000)
  return percent
}

export const getColor = (id) => {
  const colors = [
    '#B0E4FD ',
    '#FDC5C0',
    '#E1BBE8 ',
    '#C7E7C8 ',
    '#FFFAC0 ',
    '#FFDFAE ',
    '#D6CBC6 ',
    '#E1E1E1 ',
    '#CED7DC ',
  ]
  return (id) ? colors[id % colors.length] : colors[0]
}

export const getNumDaysInView = (view) => {
  switch (view) {
    case '4_DAY':
      return 4
    case 'WEEK':
      return 7
    case '2_WEEK':
      return 14
    case 'MONTH':
    default:
      return 35
  }
}

export const isThisMonth = (refDate, otherDate) => {
  const ref = moment(refDate)
  const day = moment(otherDate)
  return ref.month() === day.month() && ref.year() === day.year()
}

export function getDays(refDate, numDays = NUMBER_OF_DAYS) {
  if (numDays <= 4) return countMap(offset => moment(refDate).add(offset, 'd').format(), numDays)
  if (numDays <= 10) return countMap(offset => moment(refDate).day(offset).format(), numDays)
  const correctedNumDays = Math.ceil(numDays / 7) * 7

  // chunks days into week arrays of day arrays
  return countMap(i => i - moment(refDate).date(), correctedNumDays)
          .map(offset => moment(refDate).day(offset).format())
}

export function getChunkedDays(refDate, numDays = NUMBER_OF_DAYS) {
  // if numDays < 10, create a week view with dayOfTheWeek offset
  const days = getDays(refDate, numDays)
  if (numDays <= 10) return [days]
  // chunks days into week arrays of day arrays
  return chunk(days, 7)
}

export function getOrderedMonthArray(date) {
  return countMap(month => moment(date).add(month, 'M'), 12)
}
