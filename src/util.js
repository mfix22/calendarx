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
    case 'weeks':
    case 'week':
    case 'w': {
      newDate.setDate(newDate.getDate() + n * 7)
      return newDate
    }
    case 'days':
    case 'day':
    case 'd': {
      newDate.setDate(newDate.getDate() + n)
      return newDate
    }
  }
  return newDate
}

function getStartOfWeek(d, { startOfWeek }) {
  const date = new Date(d)
  const day = date.getDay()
  const correction = startOfWeek > day ? startOfWeek - 7 : startOfWeek
  date.setDate(date.getDate() - correction)
  date.setHours(0, 0, 0, 0)
  return date
}

export function isSame(d1, d2, precision = 'day') {
  if (d1.getFullYear() !== d2.getFullYear()) {
    return false
  }

  if (precision === 'year') {
    return true
  }

  if (d1.getMonth() !== d2.getMonth()) {
    return false
  }

  if (precision === 'month') {
    return true
  }

  if (precision === 'week') {
    return getStartOfWeek(d1) - getStartOfWeek(d2) === 0
  }

  return d1.getDate() === d2.getDate()
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

function toDateArray(start, numDays) {
  return countMap(offset => add(start, offset, 'd'), numDays)
}

function getDays(refDate, numDays, { startOfWeek }) {
  if (numDays <= 4) {
    return toDateArray(refDate, numDays)
  }

  if (numDays <= 10) {
    const currDayOfWeek = refDate.getDay()
    const correction = startOfWeek > currDayOfWeek ? startOfWeek - 7 : startOfWeek

    const startDate = add(refDate, -currDayOfWeek + correction, 'd')

    return toDateArray(startDate, numDays)
  }

  if (numDays <= 365) {
    // Round up to multiple of 7
    const correctedNumDays = Math.ceil(numDays / 7) * 7

    const pivotDate = refDate.getDate() - 1 // 0th based month indexing

    const firstDate = new Date(refDate)
    firstDate.setDate(1)
    const firstDay = firstDate.getDay()

    const currDayOfWeek = pivotDate + firstDay
    const correction = startOfWeek > firstDay ? startOfWeek - 7 : startOfWeek

    const startDate = add(refDate, -currDayOfWeek + correction, 'd')

    return toDateArray(startDate, correctedNumDays)
  }

  const startDate = new Date(refDate)
  startDate.setDate(1)
  startDate.setMonth(0)

  return toDateArray(startDate, numDays)
}

export function getMappedDays(refDate, numDays, { startOfWeek }) {
  // if numDays < 10, create a week view with dayOfTheWeek offset
  return getDays(refDate, numDays, { startOfWeek }).map(date => new ComparativeDate(refDate, date))
}

export function chunkDays(days, numDays) {
  if (numDays <= 10) return [days]
  // chunks days into week arrays of day arrays
  return chunk(days, 7)
}

class ComparativeDate {
  constructor(referenceDate, date) {
    this.referenceDate = referenceDate
    this.date = new Date(date)
  }

  get isToday() {
    return isSame(this.referenceDate, this.date)
  }

  get isThisMonth() {
    return isSame(this.referenceDate, this.date, 'month')
  }

  get isThisYear() {
    return isSame(this.referenceDate, this.date, 'year')
  }

  // TODO custom getters:
  // isPreviousDay: mom.isBefore(today, 'day'),
  // isPreviousMonth: mom.isBefore(today, 'month'),
  // isPreviousYear: mom.isBefore(today, 'year'),
  // isNextDay: mom.isAfter(today, 'day'),
  // isNextMonth: mom.isAfter(today, 'month'),
  // isNextYear: mom.isAfter(today, 'year')
  // isThisWeek: mom.isSame(today, 'week'),),
  // isNextWeek: mom.isAfter(today, 'week'),
  // isPreviousWeek: mom.isBefore(today, 'week'),
}
