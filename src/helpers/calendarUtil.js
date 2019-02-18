import ms from 'ms'
import moment from 'moment'
import { chunk, countMap } from './util'

const ONE_DAY = ms('24d')
export const durationPercentage = duration => {
  return duration / ONE_DAY
}

export const isThisMonth = (refDate, otherDate) => {
  const ref = moment(refDate)
  const day = moment(otherDate)
  return ref.month() === day.month() && ref.year() === day.year()
}

export function getDays(refDate, numDays) {
  if (numDays <= 4)
    return countMap(
      offset =>
        moment(refDate)
          .add(offset, 'd')
          .format(),
      numDays
    )
  if (numDays <= 10)
    return countMap(
      offset =>
        moment(refDate)
          .day(offset)
          .format(),
      numDays
    )
  const correctedNumDays = Math.ceil(numDays / 7) * 7

  // chunks days into week arrays of day arrays
  return countMap(i => i - moment(refDate).date(), correctedNumDays).map(offset =>
    moment(refDate)
      .day(offset)
      .format()
  )
}

export function getChunkedDays(refDate, numDays) {
  // if numDays < 10, create a week view with dayOfTheWeek offset
  const days = getDays(refDate, numDays)
  if (numDays <= 10) return [days]
  // chunks days into week arrays of day arrays
  return chunk(days, 7)
}
