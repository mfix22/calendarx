import React from 'react'
import moment from 'moment'

import { timePercentage, durationPercentage } from '../helpers/calendarUtil'

const Event = ({ details, numDays, style }) => {
  const getStyle = () => {
    const base = {
      width: '100%',
      padding: '4px',
      fontSize: '12px',
      overflowY: 'hidden',
      textAlign: 'left',
      backgroundColor: '#B0E4FD',
    }
    if (numDays > 10) return Object.assign(base, {
      position: 'static',
      boxSizing: 'border-box',
      top: 0,
    })

    // Relative time and duration offsets
    return Object.assign(base, {
      boxSizing: 'border-box',
      position: 'absolute',
      top: `${timePercentage(details.time)}%`,
      minHeight: `${durationPercentage(details.duration)}%`,
      paddingLeft: '8px',
      paddingRight: '8px'
    })
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
