import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Event from './Event'
import Moon from '../embeddables/Moon'

import { isThisMonth } from '../../helpers/calendarUtil'

const getHeaderFormat = (window) => {
  switch (window) {
    case 'MONTH':
      return 'M/D'
    case 'WEEK':
      return 'ddd M/D'
    default:
      return 'dddd M/D'
  }
}

const setViewClasses = (window) => {
  switch (window) {
    case 'MONTH':
      return 'monthView'
    case 'WEEK':
      return 'weekView'
    default:
      return 'dayView'
  }
}

const DateColumn = ({ refDate, window, day, events, width, settings }) => {
  return (
    <div
      className={`dateColumn ${setViewClasses(window)}`}
      style={{
        width,
        opacity: (isThisMonth(refDate, day) || window !== 'MONTH') ? 1 : 0.4,
        overflow: 'hidden'
      }}
    >
      <p className={`header ${moment(day).isSame(moment(), 'day') ? 'today' : ''}`}>
        {moment(day).format(getHeaderFormat(window)).toUpperCase()}
      </p>
      <ul className="embeddables">
        {
          settings && settings.embeddables && settings.embeddables.length ?
            <Moon date={day} settings={settings.embeddables.moon} /> :
            null
        }
      </ul>
      {
        events.filter((e) => {
          return moment(e.time).isSame(day, 'day')
        }).map((calEvent, index) => {
          return (
            <Event
              key={calEvent.id}
              details={calEvent}
              view={window}
              style={{ zIndex: 500 - index }}
            />
          )
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    refDate: state.view.date,
    window: state.view.window,
    settings: state.settings
  }
}

export default connect(mapStateToProps)(DateColumn)
