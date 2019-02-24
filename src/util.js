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
      const previousDate = newDate.getDate()
      newDate.setDate(1)
      newDate.setMonth(newDate.getMonth() + n)
      const maxDay = getDaysInMonth(newDate)
      newDate.setDate(Math.min(maxDay, previousDate))
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

function getDaysInMonth(date) {
  const month = date.getMonth()
  const year = date.getFullYear()

  return new Date(year, month + 1, 0).getDate()
}

function getWeekdayOffset(dayIndex, weekStartsOn) {
  const correction = weekStartsOn > dayIndex ? weekStartsOn - 7 : weekStartsOn

  return -dayIndex + correction
}

function getStartOfWeek(d, weekStartsOn) {
  const date = new Date(d)
  const day = date.getDay()
  const correction = getWeekdayOffset(day, weekStartsOn)

  date.setDate(date.getDate() + correction)
  date.setHours(0, 0, 0, 0)
  return date
}

export function isSame(d1, d2, precision, weekStartsOn = 0) {
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
    return getStartOfWeek(d1, weekStartsOn) - getStartOfWeek(d2, weekStartsOn) === 0
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

function getDays(refDate, numDays, { view, weekStartsOn }) {
  if (view === 'week') {
    const currDayOfWeek = refDate.getDay()
    const correction = getWeekdayOffset(currDayOfWeek, weekStartsOn)

    const startDate = add(refDate, correction, 'd')

    return toDateArray(startDate, numDays)
  }

  if (view === 'month') {
    // Round up to multiple of 7
    const correctedNumDays = Math.ceil(numDays / 7) * 7

    const firstDate = new Date(refDate)
    firstDate.setDate(1)
    const firstDay = firstDate.getDay()

    const correction = getWeekdayOffset(firstDay, weekStartsOn)

    const startDate = add(firstDate, correction, 'd')

    return toDateArray(startDate, correctedNumDays)
  }

  if (view === 'year') {
    // Round up to multiple of 7
    const correctedNumDays = Math.ceil(numDays / 7) * 7

    const firstDate = new Date(refDate)
    firstDate.setDate(1)
    firstDate.setMonth(0)
    const firstDay = firstDate.getDay()

    const correction = getWeekdayOffset(firstDay, weekStartsOn)

    const startDate = add(firstDate, correction, 'd')

    return toDateArray(startDate, correctedNumDays)
  }

  // view === 'day'
  return toDateArray(refDate, numDays)
}

export function getMappedDays(refDate, numDays, { view, weekStartsOn }) {
  return getDays(refDate, numDays, { view, weekStartsOn }).map(date =>
    ComparativeDate(refDate, date, { view, weekStartsOn })
  )
}

function ComparativeDate(referenceDate, date, options) {
  return {
    date,
    get isToday() {
      return isSame(date, new Date(), 'day')
    },
    isSame(unit = 'day') {
      return isSame(referenceDate, date, unit, options.weekStartsOn)
    }
    // TODO isPrev, isNext
  }
}
