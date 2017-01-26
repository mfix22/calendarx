import React from 'react'
import WeekRow from './WeekRow'

import { getChunkedDays } from '../../helpers/calendarUtil'

require('../../styles/index.scss')

const Calendar = ({ events, referenceDate, daysInView }) => {
  const days = getChunkedDays(referenceDate, daysInView)
  return (
    <div className="module calendar">
      {
        days.map((week, key) => (
          <WeekRow key={key} events={events} numSibs={days.length} days={week} />
        ))
      }
    </div>
  )
}

// referenceDate: state.view.date,
// events: [...getProposedOptions(state), ...state.events],
// daysInView: getNumDaysInView(state.view.window)

export default Calendar
