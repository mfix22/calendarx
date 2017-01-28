import React from 'react'
import moment from 'moment'
import WeekRow from './WeekRow'


import { getChunkedDays } from '../helpers/calendarUtil'
import {
  CALENDAR_WIDTH,
  CALENDAR_HEIGHT,
  NUMBER_OF_DAYS,
  DEFAULT_EVENTS,
  TODAY_CLASS,
  CURR_MONTH_CLASS,
  PREV_MONTH_CLASS,
  NEXT_MONTH_CLASS,
  TODAY_STYLE,
  PREV_MONTH_STYLE,
  NEXT_MONTH_STYLE,
  THEME_COLOR,
  FONT
} from '../defaults'

require('../styles/index.scss')

const Calendarx = (props) => {
  const {
    events,
    referenceDate,
    numDays,
    width,
    height,
    todayClass,
    todayStyle,
    currMonthClass,
    prevMonthClass,
    prevMonthStyle,
    nextMonthClass,
    nextMonthStyle,
    themeColor
  } = props
  const numDaysInView = numDays || NUMBER_OF_DAYS
  const referenceDateToUse = referenceDate || moment().format()
  const days = getChunkedDays(referenceDateToUse, numDaysInView)

  const getWidth = () => {
    if (width) {
      if (typeof width === 'number') return `${width}px`
      return width
    }
    return CALENDAR_WIDTH
  }

  const getHeight = () => {
    if (height) {
      if (typeof width === 'number') return `${height}px`
      return height
    }
    if (width) {
      if (typeof width === 'number') return `${width}px`
      return width
    }
    return CALENDAR_HEIGHT
  }

  return (
    <div
      className="module calendar"
      style={{
        width: getWidth(),
        height: getHeight(),
        backgroundColor: '#e9e9e9',
        boxSizing: 'border-box',
        fontFamily: FONT,
        fontSize: '16px'
      }}
    >
      {
        days.map((week, key) => (
          <WeekRow
            key={key}
            days={week}
            numSibs={days.length}
            events={events || DEFAULT_EVENTS}
            referenceDate={referenceDateToUse}
            numDays={numDaysInView}
            todayClass={todayClass || TODAY_CLASS}
            currMonthClass={currMonthClass || CURR_MONTH_CLASS}
            prevMonthClass={prevMonthClass || PREV_MONTH_CLASS}
            nextMonthClass={nextMonthClass || NEXT_MONTH_CLASS}
            todayStyle={todayStyle || TODAY_STYLE}
            prevMonthStyle={prevMonthStyle || PREV_MONTH_STYLE}
            nextMonthStyle={nextMonthStyle || NEXT_MONTH_STYLE}
            themeColor={themeColor || THEME_COLOR}
          />
        ))
      }
    </div>
  )
}

export default Calendarx
