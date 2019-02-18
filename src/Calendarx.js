import React from 'react'
import moment from 'moment'

import { getChunkedDays } from './helpers/calendarUtil'

const NUMBER_OF_DAYS = 35

class Calendarx extends React.Component {
  render() {
    const { events = [], referenceDate = moment().format(), numDays = NUMBER_OF_DAYS } = this.props
    const days = getChunkedDays(referenceDate, numDays)

    const Component = this.props.children

    return (
      <Component
        {...{
          referenceDate,
          numDays,
          days,
          events
        }}
      />
    )
    // return events
    // .filter(e => moment(e.date).isSame(day, 'day'))
    // .map((calEvent, index) => <Event key={index} details={calEvent} numDays={numDays} />)
  }
}

export default Calendarx

/* TODO Calculate: 
- isToday
- isThisMonth
- isThisWeek
- isNextWeek
- isPrevWeek, 
- isNextMonth
- isPreviousMonth
- durationPercentage

/* 
 if (!details.time || !moment(details.time).isValid()) {
    throw new Error(
      `Event: ${details} does not have a valid \`time\` property. See http://momentjs.com/docs for valid time options.`
    )
  }
*/
