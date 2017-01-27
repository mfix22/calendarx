import React from 'react'
import moment from 'moment'
import Event from './Event'

import { isThisMonth } from '../helpers/calendarUtil'

const getHeaderFormat = (numDays) => {
  if (numDays <= 4) return 'dddd M/D'
  if (numDays <= 10) return 'ddd M/D'
  return 'M/D'
}

const setViewClasses = (numDays) => {
  if (numDays <= 4) return 'dayView'
  if (numDays <= 10) return 'weekView'
  return 'monthView'
}

const DateColumn = (props) => {
  const { referenceDate, daysInView, day, events, width, todayClass } = props
  const getWhichMonthClass = () => {
    if (daysInView < 10) return ''
    if (isThisMonth(referenceDate, day)) return 'currMonth'
    if (moment(referenceDate).isBefore(day)) return 'nextMonth'
    return 'prevMonth'
  }

  return (
    <div
      className={
        [
          'dateColumn',
          setViewClasses(daysInView),
          moment(day).isSame(moment(), 'day') ? todayClass : '',
          getWhichMonthClass()
        ].join(' ')
      }
      style={{
        width,
        opacity: (isThisMonth(referenceDate, day) || daysInView < 10) ? 1 : 0.4,
        overflow: 'hidden'
      }}
    >
      <p className={`header ${moment(day).isSame(moment(), 'day') ? todayClass : ''}`}>
        {moment(day).format(getHeaderFormat(daysInView)).toUpperCase()}
      </p>
      {
        events && events.filter((e) => {
          return moment(e.time).isSame(day, 'day')
        }).map((calEvent, index) => {
          return (
            <Event
              key={calEvent.id}
              details={calEvent}
              style={{ zIndex: 500 - index }}
            />
          )
        })
      }
    </div>
  )
}

export default DateColumn
