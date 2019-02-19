import React from 'react'
import memoizeOne from 'memoize-one'

import { add, getMappedDays, getChunkedDays } from './util'

const DAY_MAP = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6
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
    const { numDays } = this.props
    if (numDays <= 4) {
      return this.jump(x, 'days')
    }
    if (numDays <= 10) {
      return this.jump(x, 'weeks')
    }
    return this.jump(1, 'months')
  }

  prev = (x = -1) => this.next(x)

  today = () => this.updateReferenceDate(new Date())

  createEventCache = memoizeOne(events =>
    events.reduce((map, event) => {
      if (!event.date) {
        return map
      }

      const key = format(event.date).split('T')[0]

      const list = map.get(key) || []
      list.push(event)

      return map.set(key, list)
    }, new Map())
  )

  getChunkedDays = memoizeOne((referenceDate, numDays, startOfWeek, events) => {
    const eventCache = this.createEventCache(events)

    const days = getMappedDays(referenceDate, numDays, { startOfWeek })

    const daysWithEvents = days.map(day => {
      const key = day.date.split('T')[0]
      const events = eventCache.get(key) || []
      return {
        ...day,
        events
      }
    })

    return getChunkedDays(daysWithEvents, numDays)
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
          isoDate: referenceDate,
          unixDate: date.valueOf(),
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
