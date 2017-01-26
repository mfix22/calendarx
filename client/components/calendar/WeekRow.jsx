import React from 'react'
import DateColumn from './DateColumn'

const WeekRow = ({ days, events, numSibs, referenceDate, daysInView }) => {
  return (
    <div
      className="weekRow"
      style={{
        height: `${(600) / numSibs}px`
      }}
    >
      {
        days.map((day) => {
          return (
            <DateColumn
              width={`${100 / days.length}%`}
              key={day}
              day={day}
              events={events}
              referenceDate={referenceDate}
              daysInView={daysInView}
            />
          )
        })
      }
    </div>
  )
}

export default WeekRow
