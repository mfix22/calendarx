import React from 'react'
import memoizeOne from 'memoize-one'

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

class Calendarx extends React.Component {
  static defaultProps = {
    initialNumDays: 35,
    events: [],
    weekStartsOn: DAYS.SUNDAY,
    headers: HEADERS
  }

  static days = DAYS
  static views = VIEWS

  state = {
    referenceDate: format(this.props.initialDate),
    numDays: Math.max(this.props.initialNumDays, 0)
  }

  setReferenceDate = newDate => {
    if (!this.props.date) {
      this.setState({ referenceDate: format(newDate) })
    }
  }

  setNumDays = numDays => {
    if (!this.props.numDays) {
      this.setState({ numDays: Math.max(numDays, 0) })
    }
  }

  jump = (n, unit = 'days') => this.setReferenceDate(add(this.getDate(), n, unit))

  next = (x = 1) => {
    const jumpBy = typeof x === 'number' ? x : 1
    const view = getView(this.getNumDays())

    return this.jump(jumpBy, view)
  }

  prev = (x = 1) => this.next(-x)

  today = () => this.setReferenceDate(new Date())

  getDate = () => this.props.date || this.state.referenceDate
  getNumDays = () => this.props.numDays || this.state.numDays

  getChunkedDays = memoizeOne((referenceDate, numDays, weekStartsOn, events) => {
    const eventCache = createEventCache(events)
    const view = getView(numDays)

    const days = getMappedDays(referenceDate, numDays, { weekStartsOn, view })

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
  })

  getHeaders = memoizeOne((headers, starting, length) => {
    return Array.from({ length }, (_, i) => {
      const day = (starting + i) % headers.length
      return {
        title: headers[day],
        day
      }
    })
  })

  // https://ej2.syncfusion.com/documentation/calendar/accessibility/
  getTodayButtonProps = getButtonProps({ label: 'Go to today', onClick: this.today })
  getNextButtonProps = getButtonProps({ label: 'Go to next', onClick: this.next })
  getPrevButtonProps = getButtonProps({ label: 'Go to previous', onClick: this.prev })

  render() {
    const referenceDate = this.getDate()
    const numDays = this.getNumDays()

    const { events, weekStartsOn } = this.props

    const view = getView(numDays)

    const date = new Date(referenceDate)
    const days = this.getChunkedDays(date, numDays, weekStartsOn, events)

    const headers = this.getHeaders(
      this.props.headers,
      view === 'day' ? date.getDay() : weekStartsOn,
      days[0].length
    )

    const Component = this.props.children || this.props.render
    return (
      <Component
        {...{
          date,
          days,
          headers,
          view,
          numDays,
          jump: this.jump,
          goToNext: this.next,
          goToPrev: this.prev,
          goToToday: this.today,
          goToDate: this.setReferenceDate,
          getPrevButtonProps: this.getPrevButtonProps,
          getNextButtonProps: this.getNextButtonProps,
          getTodayButtonProps: this.getTodayButtonProps,
          setNumDays: this.setNumDays
        }}
      />
    )
  }
}

export default Calendarx
