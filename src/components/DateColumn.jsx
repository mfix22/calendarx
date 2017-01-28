import React from 'react'
import moment from 'moment'
import Event from './Event'

import { isThisMonth } from '../helpers/calendarUtil'

const getHeaderFormat = (numDays) => {
  if (numDays <= 4) return 'dddd M/D'
  if (numDays <= 10) return 'ddd M/D'
  return 'M/D'
}

const setViewClasses = (numDays) => {
  if (numDays <= 4) return 'dayView'
  if (numDays <= 10) return 'weekView'
  return 'monthView'
}

const DateColumn = (props) => {
  const {
    last,
    referenceDate,
    numDays,
    day,
    events,
    width,
    todayClass,
    currMonthClass,
    nextMonthClass,
    prevMonthClass,
    nextMonthStyle,
    prevMonthStyle,
    themeColor
  } = props
  const IS_TODAY = moment(day).isSame(moment(), 'day')

  const getWhichMonthClass = () => {
    if (numDays < 10) return ''
    if (isThisMonth(referenceDate, day)) return currMonthClass
    if (moment(referenceDate).isBefore(day)) return nextMonthClass
    return prevMonthClass
  }

  const getStyle = () => {
    const base = {
      width,
      overflow: 'hidden',
      position: 'relative',
      display: 'inline-block',
      borderRight: '1px solid #dbdbdb',
      height: '100%',
      verticalAlign: 'top',
      padding: 0,
      boxSizing: 'border-box'
    }
    const monthViewStyle = {
      borderBottom: '1px solid #dbdbdb'
    }
    const lastStyle = last ? {
      borderRightWidth: 0
    } : {}

    if (numDays < 10) return base
    if (isThisMonth(referenceDate, day))
      return Object.assign(base, lastStyle, monthViewStyle)
    if (moment(referenceDate).isBefore(day))
      return Object.assign(base, lastStyle, monthViewStyle, nextMonthStyle)

    return Object.assign(base, lastStyle, monthViewStyle, prevMonthStyle)
  }

  const getHeaderStyle = () => {
    const base = {
      boxSizing: 'border-box',
      fontSize: '12px',
      color: '#757575',
      position: 'relative'
    }

    const todayStyle = IS_TODAY ? {
      fontWeight: 600,
      color: themeColor,
      boxSizing: 'border-box'
    } : {}

    if (numDays <= 10) return Object.assign(base, todayStyle, {
      textAlign: 'center',
      padding: '12px 0px 0px',
      height: '36px',
      zIndex: 999,
      verticalAlign: 'middle'
    })

    return Object.assign(base, todayStyle, {
      textAlign: 'left',
      paddingLeft: '7px',
      marginTop: '8px'
    })
  }

  return (
    <div
      className={[
        'dateColumn',
        setViewClasses(numDays),
        moment(day).isSame(moment(), 'day') ? todayClass : '',
        getWhichMonthClass()
      ].join(' ')}
      style={getStyle()}
    >
      <p
        className={[
          'header',
          IS_TODAY ? todayClass : ''
        ].join(' ')}
        style={getHeaderStyle()}
      >
        {moment(day).format(getHeaderFormat(numDays)).toUpperCase()}
      </p>
      {
        events && events.filter((e) => {
          return moment(e.time).isSame(day, 'day')
        }).map((calEvent, index) => {
          return (
            <Event
              key={calEvent.id}
              details={calEvent}
              style={{ zIndex: 500 - index }}
              numDays={numDays}
            />
          )
        })
      }
    </div>
  )
}

export default DateColumn
