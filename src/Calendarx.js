import React from 'react'
import moment from 'moment'

import { getChunkedDays } from './util'

class Calendarx extends React.Component {
  static defaultProps = {
    numDays: 35,
    events: [],
    startOfWeek: 0
  }

  static days = {
    SUNDAY: 0,
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6
  }

  state = {
    referenceDate: this.props.initialReferenceDate || moment().format()
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

  today = () => this.updateReferenceDate(moment())

  render() {
    const { referenceDate } = this.state
    const { events, numDays, startOfWeek } = this.props

    const days = getChunkedDays(referenceDate, numDays, { startOfWeek })

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

    const daysWithEvents = days.map(week =>
      week.map(day => {
        const mom = moment(day.date)
        const key = mom.format('YYYY-MM-DD')
        const events = eventCache.get(key) || []
        return {
          ...day,
          events
        }
      })
    )

    const Component = this.props.children
    return (
      <Component
        {...{
          referenceDate,
          days: daysWithEvents,
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
