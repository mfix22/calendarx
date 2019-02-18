import React from 'react'
import moment from 'moment'

import { chunk, getMappedDays, getChunkedDays } from './util'

const DAY_MAP = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6
}

class Calendarx extends React.Component {
  static defaultProps = {
    numDays: 35,
    events: [],
    startOfWeek: DAY_MAP.SUNDAY
  }

  static days = DAY_MAP

  state = {
    referenceDate: this.props.initialReferenceDate || new Date()
  }

  updateReferenceDate = newDate => this.setState({ referenceDate: moment(newDate).format() })

  jump = (n, unit = 'days') =>
    this.updateReferenceDate(moment(this.state.referenceDate).add(n, unit))

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

  render() {
    const { referenceDate } = this.state
    const { events, numDays, startOfWeek } = this.props

    // TODO create this during construction and add addEvent and removeEvent hooks?
    const eventCache = events.reduce((map, event) => {
      const mom = moment(event.date)
      if (!event.date || !mom.isValid()) {
        throw new Error('Event does not have a valid `date` property')
      }

      const key = mom.format('YYYY-MM-DD')

      const list = map.get(key) || []
      list.push(event)

      return map.set(key, list)
    }, new Map())

    const days = getMappedDays(referenceDate, numDays, { startOfWeek })

    const daysWithEvents = days.map(day => {
      const mom = moment(day.date)
      const key = mom.format('YYYY-MM-DD')
      const events = eventCache.get(key) || []
      return {
        ...day,
        events
      }
    })

    const chunkedDays = getChunkedDays(daysWithEvents, numDays)

    const Component = this.props.children
    return (
      <Component
        {...{
          referenceDate,
          unix: moment(referenceDate).valueOf(),
          days: chunkedDays,
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
