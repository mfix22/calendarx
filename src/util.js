import moment from 'moment'

function chunk(a, c) {
  const chunks = []
  let i = 0
  let n = a.length

  while (i < n) {
    chunks.push(a.slice(i, (i += c)))
  }

  return chunks
}

function unfold(func, s) {
  const go = (f, seed, acc) => {
    const res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
  }
  return go(func, s, [])
}

function countMap(f, c, step = 1) {
  return unfold(x => {
    if (x < c * step) return [f(x), x + step]
    return null
  }, 0)
}

function getDays(refDate, numDays) {
  if (numDays <= 4) return countMap(offset => moment(refDate).add(offset, 'd'), numDays)
  if (numDays <= 10) return countMap(offset => moment(refDate).day(offset), numDays)
  const correctedNumDays = Math.ceil(numDays / 7) * 7

  // chunks days into week arrays of day arrays
  return countMap(i => i - moment(refDate).date(), correctedNumDays).map(offset =>
    moment(refDate).day(offset)
  )
}

export function getChunkedDays(refDate, numDays) {
  // if numDays < 10, create a week view with dayOfTheWeek offset
  const today = moment()
  const days = getDays(refDate, numDays).map(mom => {
    return {
      date: mom.format(),
      isToday: mom.isSame(today, 'day'),
      isThisWeek: mom.isSame(today, 'week'),
      isThisMonth: mom.isSame(today, 'month'),
      isThisYear: mom.isSame(today, 'year')
      // isPreviousDay: mom.isBefore(today, 'day'),
      // isPreviousWeek: mom.isBefore(today, 'week'),
      // isPreviousMonth: mom.isBefore(today, 'month'),
      // isPreviousYear: mom.isBefore(today, 'year'),
      // isNextDay: mom.isAfter(today, 'day'),
      // isNextWeek: mom.isAfter(today, 'week'),
      // isNextMonth: mom.isAfter(today, 'month'),
      // isNextYear: mom.isAfter(today, 'year')
    }
  })

  if (numDays <= 10) return [days]
  // chunks days into week arrays of day arrays
  return chunk(days, 7)
}
