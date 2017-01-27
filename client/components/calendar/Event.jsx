import React from 'react'
import moment from 'moment'

const timePercentage = (time) => {
  const timeMoment = moment(time)
  const hour = timeMoment.hour()
  const minute = timeMoment.minute()

  const percent = ((((60 * hour) + minute) - (7 * 60)) * 100) / (14 * 60)
  return percent
}

const durationPercentage = (duration) => {
  const percent = ((duration || 1 * 60 * 60 * 1000) * 100) / (24 * 60 * 60 * 1000)
  return percent
}

const Event = ({ details, daysInView, style }) => {
  const getStyle = () => {
    if (daysInView > 10) {
      return {
        position: 'static',
      }
    }
    // Relative time and duration offsets
    return {
      position: 'absolute',
      top: `${timePercentage(details.time)}%`,
      minHeight: `${durationPercentage(details.duration)}%`
    }
  }

  return (
    <div
      className={`calendarEvent ${durationPercentage(details.duration) < 8 ? 'shortEvent' : 'longEvent'}`}
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
