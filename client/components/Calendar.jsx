import React from 'react'
import WeekRow from './WeekRow'

import { getChunkedDays } from '../helpers/calendarUtil'

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
  const days = getChunkedDays(referenceDate, daysInView)
  return (
    <div
      className="module calendar"
      style={{
        width: width || '100%',
        height: height || width || '600px'
      }}
    >
      {
        days.map((week, key) => (
          <WeekRow
            key={key}
            events={events}
            numSibs={days.length}
            days={week}
            daysInView={daysInView}
          />
        ))
      }
    </div>
  )
}

// referenceDate: state.view.date,
// events: [...getProposedOptions(state), ...state.events],
// daysInView: getNumDaysInView(state.view.window)

export default Calendar
