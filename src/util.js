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

function getStartOfWeek(d, startOfWeek = 0) {
  const date = new Date(d)
  const day = date.getDay()
  const correction = startOfWeek > day ? startOfWeek - 7 : startOfWeek
  date.setDate(date.getDate() - correction)
  date.setHours(0, 0, 0, 0)
  return date
}

function isSame(d1, d2, precision = 'day', startOfWeek = 0) {
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
    return getStartOfWeek(d1, startOfWeek) - getStartOfWeek(d2, startOfWeek) === 0
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

function toDateArray(start, numDays) {
  return unfold(x => {
    if (x < numDays) return [add(start, x, 'd'), x + 1]
    return null
  }, 0)
}

function getDays(refDate, numDays, { view, startOfWeek }) {
  if (view === 'day') {
    return toDateArray(refDate, numDays)
  }

  if (view === 'week') {
    const currDayOfWeek = refDate.getDay()
    const correction = startOfWeek > currDayOfWeek ? startOfWeek - 7 : startOfWeek

    const startDate = add(refDate, -currDayOfWeek + correction, 'd')

    return toDateArray(startDate, numDays)
  }

  if (view === 'month') {
    // Round up to multiple of 7
    const correctedNumDays = Math.ceil(numDays / 7) * 7

    const pivotDate = refDate.getDate() - 1 // 0th based month indexing

    const firstDate = new Date(refDate)
    firstDate.setDate(1)
    const firstDay = firstDate.getDay()

    const correction = startOfWeek > firstDay ? startOfWeek - 7 : startOfWeek

    const startDate = add(refDate, -pivotDate - firstDay + correction, 'd')

    return toDateArray(startDate, correctedNumDays)
  }

  if (view === 'year') {
    const startDate = new Date(refDate)
    startDate.setDate(1)
    startDate.setMonth(0)

    return toDateArray(startDate, numDays)
  }
}

export function getMappedDays(refDate, numDays, { view, startOfWeek }) {
  return getDays(refDate, numDays, { view, startOfWeek }).map(
    date => new ComparativeDate(refDate, date, { view, startOfWeek })
  )
}

class ComparativeDate {
  constructor(referenceDate, date, { startOfWeek }) {
    this.referenceDate = referenceDate
    this.date = new Date(date)
    this.startOfWeek = startOfWeek
  }

  get isToday() {
    return isSame(this.referenceDate, this.date, 'day')
  }

  get isThisWeek() {
    return isSame(this.referenceDate, this.date, 'week', this.startOfWeek)
  }

  get isThisMonth() {
    return isSame(this.referenceDate, this.date, 'month')
  }

  get isThisYear() {
    return isSame(this.referenceDate, this.date, 'year')
  }

  // TODO custom getters:
  // isPreviousDay: mom.isBefore(today, 'day'),
  // isNextWeek: mom.isAfter(today, 'week'),
  // isPreviousWeek: mom.isBefore(today, 'week'),
  // isPreviousMonth: mom.isBefore(today, 'month'),
  // isPreviousYear: mom.isBefore(today, 'year'),
  // isNextDay: mom.isAfter(today, 'day'),
  // isNextMonth: mom.isAfter(today, 'month'),
  // isNextYear: mom.isAfter(today, 'year')
}
