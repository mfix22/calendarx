import moment from 'moment'

export function add(date, n, units) {
  const newDate = new Date(date)
  switch (units) {
    case 'years':
    case 'year':
    case 'y': {
      newDate.setFullYear(newDate.getFullYear() + n)
      return newDate
    }
    case 'months':
    case 'month':
    case 'M': {
      newDate.setMonth(newDate.getMonth() + n)
      return newDate
    }
    // case 'weeks':
    // case 'month':
    // case 'M': {
    //   newDate.setDate(date.getDate() + n)
    //   return newDate
    // }
    case 'days':
    case 'day':
    case 'd': {
      newDate.setDate(newDate.getDate() + n)
      return newDate
    }
  }
}

export function chunk(a, c) {
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

function getDays(refDate, numDays, { startOfWeek }) {
  if (numDays <= 4) return countMap(offset => moment(refDate).add(offset, 'd'), numDays)
  if (numDays <= 10) return countMap(offset => moment(refDate).day(offset + startOfWeek), numDays)
  const correctedNumDays = Math.ceil(numDays / 7) * 7

  // chunks days into week arrays of day arrays
  const pivotDate = moment(refDate).date()
  return countMap(i => moment(refDate).day(i - pivotDate), correctedNumDays)
}

export function getMappedDays(refDate, numDays, { startOfWeek }) {
  // if numDays < 10, create a week view with dayOfTheWeek offset
  const days = getDays(refDate, numDays, { startOfWeek }).map(mom => {
    return {
      date: mom.format(),
      isToday: mom.isSame(new Date(), 'day')
      // isThisWeek: mom.isSame(today, 'week'),
      // isThisMonth: mom.isSame(today, 'month'),
      // isThisYear: mom.isSame(today, 'year')
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

  return days
}

export function getChunkedDays(days, numDays) {
  if (numDays <= 10) return chunk(days, 1)
  // chunks days into week arrays of day arrays
  return chunk(days, 7)
}
