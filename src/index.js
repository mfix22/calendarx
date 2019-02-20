import React from 'react'
import memoizeOne from 'memoize-one'

import { add, getMappedDays, chunkDays } from './util'

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

function getDateKey(date) {
  return date.toISOString().split('T')[0]
}

function format(dateLike) {
  const date = dateLike ? new Date(dateLike) : new Date()
  return date.toISOString()
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

class Calendarx extends React.Component {
  static defaultProps = {
    numDays: 35,
    events: [],
    startOfWeek: DAYS.SUNDAY
  }

  static days = DAYS
  static views = VIEWS

  state = {
    referenceDate: format(this.props.initialDate)
  }

  updateReferenceDate = newDate => this.setState({ referenceDate: format(newDate) })

  jump = (n, unit = 'days') => this.updateReferenceDate(add(this.state.referenceDate, n, unit))

  next = (x = 1) => {
    const jumpBy = typeof x === 'number' ? x : 1
    const view = this.getView()

    return this.jump(jumpBy, view)
  }

  prev = (x = -1) => this.next(x)

  today = () => this.updateReferenceDate(new Date())

  getView() {
    const { numDays } = this.props
    // TODO set cutoff points in props
    if (numDays <= 4) {
      return VIEWS.DAY
    }
    if (numDays <= 10) {
      return VIEWS.WEEK
    }
    if (numDays <= 365) {
      return VIEWS.MONTH
    }
    return VIEWS.YEAR
  }

  createEventCache = memoizeOne(events =>
    events.reduce((map, event) => {
      if (!event.date) {
        return map
      }

      const key = getDateKey(event.date)

      const list = map.get(key) || []
      list.push(event)

      return map.set(key, list)
    }, new Map())
  )

  getChunkedDays = memoizeOne((referenceDate, numDays, startOfWeek, events) => {
    const eventCache = this.createEventCache(events)

    const days = getMappedDays(referenceDate, numDays, { startOfWeek })

    const daysWithEvents = days.map(day => {
      const key = getDateKey(day.date)
      day.events = eventCache.get(key) || []
      return day
    })

    return chunkDays(daysWithEvents, numDays)
  })

  // https://ej2.syncfusion.com/documentation/calendar/accessibility/
  getTodayButtonProps = getButtonProps({ label: 'Go to today', onClick: this.goToToday })
  getNextButtonProps = getButtonProps({ label: 'Go to next', onClick: this.goToNext })
  getPrevButtonProps = getButtonProps({ label: 'Go to previous', onClick: this.goToPrev })

  render() {
    const { referenceDate } = this.state
    const { events, numDays, startOfWeek } = this.props
    const view = this.getView()

    const adjustedNumDays = Math.max(numDays, 0)

    const date = new Date(referenceDate)
    const days = this.getChunkedDays(date, adjustedNumDays, startOfWeek, events)

    const Component = this.props.children || this.props.render
    return (
      <Component
        {...{
          date,
          days,
          // TODO add `headers`
          view,
          jump: this.jump,
          goToNext: this.next,
          goToPrev: this.prev,
          goToToday: this.today,
          goToDate: this.updateReferenceDate,
          getPrevButtonProps: this.getPrevButtonProps,
          getNextButtonProps: this.getNextButtonProps,
          getTodayButtonProps: this.getTodayButtonProps
        }}
      />
    )
  }
}

export default Calendarx
