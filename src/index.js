import React from 'react'

import { add, getMappedDays, chunk } from './util'

const DAYS = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6
}

const VIEWS = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year'
}

const HEADERS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const DEFAULTS = {
  initialNumDays: 35,
  events: [],
  weekStartsOn: DAYS.SUNDAY,
  headers: HEADERS
}

function getDateKey(date) {
  return date.toISOString().split('T')[0]
}

function format(dateLike) {
  const date = dateLike ? new Date(dateLike) : new Date()
  return date.toISOString()
}

function getView(numDays) {
  // TODO set cutoff points in props
  if (numDays <= 4) {
    return VIEWS.DAY
  }
  if (numDays <= 10) {
    return VIEWS.WEEK
  }
  if (numDays <= 364) {
    return VIEWS.MONTH
  }
  return VIEWS.YEAR
}

function getButtonProps({ label, onClick }) {
  return ({ onClick: userOnClick = () => {} } = {}) => {
    return {
      role: 'button',
      'aria-label': label,
      onClick: () => {
        onClick()
        userOnClick()
      }
    }
  }
}

function createEventCache(events) {
  return events.reduce((map, event) => {
    if (!event.date) {
      return map
    }

    const key = getDateKey(event.date)

    const list = map.get(key) || []
    list.push(event)

    return map.set(key, list)
  }, new Map())
}

function useCalendar({
  initialDate,
  initialNumDays = DEFAULTS.initialNumDays,
  date: dateProp,
  numDays: numDaysProp,
  events = DEFAULTS.events,
  weekStartsOn = DEFAULTS.weekStartsOn,
  headers: headersProp = DEFAULTS.headers
} = DEFAULTS) {
  const [dateState, setDateState] = React.useState(format(initialDate))
  const [numDaysState, setNumDaysState] = React.useState(Math.max(initialNumDays, 0))

  const referenceDate = dateProp || dateState
  const numDays = numDaysProp || numDaysState

  const setReferenceDate = React.useCallback(
    newDate => {
      if (!dateProp) {
        setDateState(format(newDate))
      }
    },
    [dateProp]
  )

  const setNumDays = React.useCallback(
    numDays => {
      if (!numDaysProp) {
        setNumDaysState(Math.max(numDays, 0))
      }
    },
    [numDaysProp]
  )

  const jump = React.useCallback(
    (n, unit = 'days') => setReferenceDate(add(referenceDate, n, unit)),
    [referenceDate, setReferenceDate]
  )

  const next = React.useCallback(
    (x = 1) => {
      const jumpBy = typeof x === 'number' ? x : 1
      const view = getView(numDays)

      return jump(jumpBy, view)
    },
    [jump, numDays]
  )

  const prev = React.useCallback((x = 1) => next(-x), [next])

  const today = React.useCallback(() => setReferenceDate(new Date()), [setReferenceDate])

  // https://ej2.syncfusion.com/documentation/calendar/accessibility/
  const getTodayButtonProps = React.useMemo(
    () => getButtonProps({ label: 'Go to today', onClick: today }),
    [today]
  )
  const getNextButtonProps = React.useMemo(
    () => getButtonProps({ label: 'Go to next', onClick: next }),
    [next]
  )
  const getPrevButtonProps = React.useMemo(
    () => getButtonProps({ label: 'Go to previous', onClick: prev }),
    [prev]
  )

  const date = new Date(referenceDate)

  const days = React.useMemo(() => {
    const eventCache = createEventCache(events)
    const view = getView(numDays)

    const days = getMappedDays(date, numDays, { weekStartsOn, view })

    const daysWithEvents = days.map(day => {
      const key = getDateKey(day.date)
      day.events = eventCache.get(key) || []
      return day
    })

    if (view === VIEWS.DAY || view === VIEWS.WEEK) {
      return [daysWithEvents]
    }

    // chunks days into week arrays of day arrays
    return chunk(daysWithEvents, 7)
  }, [numDays, date, events, weekStartsOn])

  const view = getView(numDays)

  const starting = view === 'day' ? date.getDay() : weekStartsOn
  const length = days[0].length
  const headers = React.useMemo(
    () =>
      Array.from({ length }, (_, i) => {
        const day = (starting + i) % headersProp.length
        return {
          title: headersProp[day],
          day
        }
      }),
    [headersProp, length, starting]
  )

  return {
    date,
    days,
    headers,
    view,
    numDays,
    jump,
    goToNext: next,
    goToPrev: prev,
    goToToday: today,
    goToDate: setReferenceDate,
    getPrevButtonProps,
    getNextButtonProps,
    getTodayButtonProps,
    setNumDays
  }
}

function Calendar(props) {
  const stuff = useCalendar(props)

  const Component = props.children || props.render
  return React.createElement(Component, stuff)
}

Calendar.defaultProps = DEFAULTS

Calendar.useCalendar = useCalendar

Calendar.days = DAYS
Calendar.views = VIEWS

export default Calendar
