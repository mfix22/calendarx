import React from 'react'
import moment from 'moment'

import { timePercentage, durationPercentage } from '../helpers/calendarUtil'

const Event = ({ details, numDays, style }) => {
  const getStyle = () => {
    if (numDays > 10) {
      return {
        position: 'static',
        boxSizing: 'border-box'
      }
    }
    // Relative time and duration offsets
    return {
      boxSizing: 'border-box',
      position: 'absolute',
      top: `${timePercentage(details.time)}%`,
      minHeight: `${durationPercentage(details.duration)}%`
    }
  }

  return (
    <div
      className={[
        'calendarEvent',
        durationPercentage(details.duration) < 8 ? 'shortEvent' : 'longEvent',
        moment(details.time).isSame(moment(), 'day') ? 'today' : ''
      ].join(' ')}
      style={Object.assign(getStyle(), style)}
    >
      <p className="event_details">
        {moment(details.time).format('LT')}<br />
        { details.title }<br />
        { details.location }<br />
      </p>
    </div>
  )
}

export default Event
