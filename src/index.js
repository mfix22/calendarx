import React from 'react'
import memoizeOne from 'memoize-one'

import { add, getMappedDays, chunkDays } from './util'

const DAY_MAP = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6
}

function getDateKey(date) {
  return date.toISOString().split('T')[0]
}

function format(dateLike) {
  const date = dateLike ? new Date(dateLike) : new Date()
  return date.toISOString()
}

class Calendarx extends React.Component {
  static defaultProps = {
    numDays: 35,
    events: [],
    startOfWeek: DAY_MAP.SUNDAY
  }

  static days = DAY_MAP

  state = {
    referenceDate: format(this.props.initialReferenceDate)
  }

  updateReferenceDate = newDate => this.setState({ referenceDate: format(newDate) })

  jump = (n, unit = 'days') => this.updateReferenceDate(add(this.state.referenceDate, n, unit))

  next = (x = 1) => {
    const jumpBy = typeof x === 'number' ? x : 1

    const { numDays } = this.props
    if (numDays <= 4) {
      return this.jump(jumpBy, 'days')
    }
    if (numDays <= 10) {
      return this.jump(jumpBy, 'weeks')
    }

    return this.jump(jumpBy, 'months')
  }

  prev = (x = -1) => this.next(x)

  today = () => this.updateReferenceDate(new Date())

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

  render() {
    const { referenceDate } = this.state
    const { events, numDays, startOfWeek } = this.props

    const days = this.getChunkedDays(referenceDate, numDays, startOfWeek, events)

    const date = new Date(referenceDate)

    const Component = this.props.children || this.props.render
    return (
      <Component
        {...{
          date,
          days,
          jump: this.jump,
          goToNext: this.next,
          goToPrev: this.prev,
          goToToday: this.today,
          goToDate: this.updateReferenceDate
        }}
      />
    )
  }
}

export default Calendarx
