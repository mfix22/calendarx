import moment from 'moment'
import { getColor } from './helpers/calendarUtil'

const VIEW_TODAY = 'VIEW_TODAY'
const VIEW_PREV = 'VIEW_PREV'
const VIEW_NEXT = 'VIEW_NEXT'
const VIEW_FUTURE_MONTHS = 'VIEW_FUTURE_MONTHS'
const CHANGE_WINDOW = 'CHANGE_WINDOW'

const RECEIVE_EVENT = 'RECEIVE_EVENT'
const RECEIVE_EVENTS = 'RECEIVE_EVENTS'

const ADD_OPTION = 'ADD_OPTION'
const DELETE_OPTION = 'DELETE_OPTION'

const CHANGE_TIME = 'CHANGE_TIME'
const CHANGE_DATE = 'CHANGE_DATE'

const ADD_USER = 'ADD_USER'

const ADD_EMAIL = 'ADD_EMAIL'
const DELETE_EMAIL = 'DELETE_EMAIL'

const SUBMIT_PROPOSAL = 'SUBMIT_PROPOSAL'

const GLOBAL_KEY_PRESS = 'GLOBAL_KEY_PRESS'

const error = err => ({
  type: 'ERROR',
  err
})

const receiveEvent = (data) => {
  const { title, location, duration, emails, options, tokens } = data
  return {
    type: RECEIVE_EVENT,
    title,
    location,
    duration,
    emails,
    options,
    users: tokens,
  }
}

const receiveGoogleEvents = (data) => {
  return {
    type: RECEIVE_EVENTS,
    events: data.map(event => ({
      id: event.id,
      title: event.summary,
      time: moment(event.start.dateTime).format(),
      duration: moment(event.end.dateTime).diff(moment(event.start.dateTime)),
      location: event.location,
      color: getColor(parseInt(event.colorId, 10))
    }))
  }
}

export {
  VIEW_TODAY,
  VIEW_PREV,
  VIEW_NEXT,
  VIEW_FUTURE_MONTHS,
  CHANGE_WINDOW,
  RECEIVE_EVENT,
  RECEIVE_EVENTS,
  ADD_OPTION,
  DELETE_OPTION,
  CHANGE_TIME,
  CHANGE_DATE,
  ADD_USER,
  ADD_EMAIL,
  DELETE_EMAIL,
  GLOBAL_KEY_PRESS,
  SUBMIT_PROPOSAL,
  error,
  receiveEvent,
  receiveGoogleEvents
}
