import React from 'react'
import moment from 'moment'

import { timePercentage, durationPercentage } from '../helpers/calendarUtil'

const Event = ({ details, numDays, style, themeColor, EventComponent }) => {
  if (!details.time || !moment(details.time).isValid())
    throw new Error(`Event: ${details} does not have a valid \`time\` property. See http://momentjs.com/docs for valid time options.`)
  const getStyle = () => {
    const base = {
      width: '100%',
      padding: '4px',
      fontSize: '12px',
      overflowY: 'hidden',
      textAlign: 'left',
      opacity: 0.8,
      backgroundColor: details.color || themeColor,
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

  const getClassNames = () => {
    return [
      'calendarEvent',
      durationPercentage(details.duration) < 8 ? 'shortEvent' : 'longEvent',
      moment(details.time).isSame(moment(), 'day') ? 'today' : ''
    ].join(' ')
  }

  const DefaultEvent = () => (
    <div
      className={getClassNames()}
      style={details.style || Object.assign(getStyle(), style)}
    >
      <p
        className="event_details"
        style={{
          margin: 0
        }}
      >
        {moment(details.time).format('LT')}<br />
        { details.title }<br />
        { details.location }<br />
      </p>
    </div>
  )

  return (
    EventComponent ?
      <EventComponent {...details} className={getClassNames()} /> :
      <DefaultEvent {...details} />
  )
}

export default Event
