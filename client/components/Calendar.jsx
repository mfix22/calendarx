import React from 'react'
import moment from 'moment'
import WeekRow from './WeekRow'


import { getChunkedDays } from '../helpers/calendarUtil'
import { CALENDAR_HEIGHT, NUMBER_OF_DAYS } from '../defaults'

require('../styles/index.scss')

const Calendar = ({
  events,
  referenceDate,
  daysInView,
  width,
  height
  // todayClass,
  // todayStyle,
  // prevMonthClass,
  // prevMonthStyle,
  // nextMonthClass,
  // nextMonthStyle,
}) => {
  const numDaysInView = daysInView || NUMBER_OF_DAYS
  const referenceDateToUse = referenceDate || moment().format()
  const days = getChunkedDays(referenceDateToUse, numDaysInView)

  const getWidth = () => {
    if (width) {
      if (typeof width === 'number') return `${width}px`
      return width
    }
    return '100%'
  }

  const getHeight = () => {
    if (height) {
      if (typeof width === 'number') return `${height}px`
      return height
    }
    if (width) {
      if (typeof width === 'number') return `${width}px`
      return width
    }
    return CALENDAR_HEIGHT
  }

  return (
    <div
      className="module calendar"
      style={{
        width: getWidth(),
        height: getHeight()
      }}
    >
      {
        days.map((week, key) => (
          <WeekRow
            key={key}
            events={events}
            numSibs={days.length}
            days={week}
            daysInView={numDaysInView}
            referenceDate={referenceDateToUse}
          />
        ))
      }
    </div>
  )
}

export default Calendar
