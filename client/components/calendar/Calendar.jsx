import React from 'react'
import { connect } from 'react-redux'
import WeekRow from './WeekRow'

import { getChunkedDays, getNumDaysInView } from '../../helpers/calendarUtil'

require('../../styles/app.scss')

const getProposedOptions = (state) => {
  return state.form.options.map((option, index) => {
    return {
      id: -1 * (index + 1), // insure doesn't overlap with pulled events
      title: `Option ${index + 1}`,
      time: Object.keys(option)[0],
      duration: state.form.duration,
      location: state.form.location,
      color: '#FFDFAE' // TODO
    }
  })
}

const Calendar = ({ events, referenceDate, daysInView }) => {
  const days = getChunkedDays(referenceDate, daysInView)
  return (
    <div className="module calendar">
      {
        days.map((week, key) => (<WeekRow key={key} events={events} numSibs={days.length} days={week} />))
      }
    </div>
  )
}

const mapStateToProps = state => ({
  referenceDate: state.view.date,
  events: [...getProposedOptions(state), ...state.events],
  daysInView: getNumDaysInView(state.view.window)
})

export default connect(mapStateToProps)(Calendar)
