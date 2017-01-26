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
        width: '92%',
      }
    }
    // Relative time and duration offsets
    return {
      position: (daysInView < 10) ? 'absolute' : 'static',
      width: '93%',
      top: `${timePercentage(details.time)}%`,
      minHeight: `${durationPercentage(details.duration)}%`
    }
  }

  return (
    <div
      className={`calendarEvent ${durationPercentage(details.duration) < 8 ? 'shortEvent' : 'longEvent'}`}
      style={Object.assign(getStyle(), style)}
    >
      <p className="event_time">{moment(details.time).format('LT')}</p>
      <p className="event_title">{ details.title }</p>
      <p className="event_location">{ details.location }</p>
      {
        /* <p className="event_time">{ moment(details.time).format('LT YYYY ddd, MMM Do') }</p>
        <p className="event_location">{ details.location }</p>*/
      }
    </div>
  )
}

export default Event
