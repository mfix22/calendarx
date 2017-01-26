import axios from 'axios'
import moment from 'moment'
// import { functor } from './helpers/functional'
import { ADD_USER, receiveEvent, receiveGoogleEvents, error } from './actions'

const client = axios.create({
  baseURL: process.env.SQUAD_HOST || 'http://localhost:4000',
  responseType: 'json',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})
client.defaults.headers.post['Content-Type'] = 'application/json'

const googleCalendarClient = axios.create({
  baseURL: 'https://www.googleapis.com/calendar/v3/calendars',
  responseType: 'json'
})

const googleAuthClient = axios.create({
  baseURL: 'https://accounts.google.com/o/oauth2/v2',
  responseType: 'json'
})

const authorize = () => gapi.auth2.getAuthInstance().signIn({
  prompt: 'select_account login'
})

const getGoogleEvents = (token, id) =>
  googleCalendarClient.get(`${id || 'primary'}/events`, {
    params: {
      access_token: token,
      timeMin: (new Date()).toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 25,
      orderBy: 'startTime'
    }
  })

const loadAllGoogleEvents = () => (dispatch, getState) =>
  Promise.all(getState().users.map(user => getGoogleEvents(user)))
    .then(eventGroups => eventGroups.reduce((events, group) => events.concat(group.data.items), []))
      .then(receiveGoogleEvents)
    .catch(error)
      .then(dispatch)

const authorizeThenLoadGoogleEvents = id => (dispatch, getState) =>
  authorize()
    .then(r => r.Zi.access_token)
      .then((token) => {
        if (!getState().users.includes(token))
          dispatch({ type: ADD_USER, user: token })

        return getGoogleEvents(token, id)
      })
      .then(r => r.data.items)
      .then(receiveGoogleEvents)
      .then(dispatch)

const fetchEvent = id => dispatch =>
  client.get(`/event/${id}`)
    .then(response => response.data)
      .then(receiveEvent)
    .catch(error)
      .then(dispatch)


const sendVote = ({ id, option }) => dispatch =>
  client.post(`/vote/${id}`, { time: moment(option).unix() })
    .then(response => response.data)
      .then(receiveEvent)
    .catch(error)
      .then(dispatch)

const sendToken = ({ id, token }) => (dispatch, getState) => {
  if (!getState().users.includes(token)) {
    return client.post(`/authToken/${id}`, { token })
      .then((response) => {
        dispatch(receiveEvent(response.data))
        dispatch(loadAllGoogleEvents())
      })
      // TODO functionalize this
      .catch(e => dispatch(error(e)))
  }

  return Promise.resolve() // no need to send server
}

// meta is extra data to include outside of state
const sendEvent = meta => (dispatch, getState) => {
  if (!meta.title) return dispatch(error(Error('Events require title')))
  const { emails, form, users: tokens } = getState()
  const { options } = form
  const { title, location, duration } = meta
  const body = {
    title,
    location,
    duration,
    emails,
    tokens,
    // array to key value pair object to match Model
    options: options.reduce((accum, option) => {
      return Object.assign(accum, {
        [moment(Object.keys(option)[0]).unix()]: 0
      })
    }, {}),
  }
  return client.post('/event', body)
    .catch(e => dispatch(error(e)))
}

export {
  authorize,
  fetchEvent,
  sendVote,
  sendEvent,
  sendToken,
  loadAllGoogleEvents,
  authorizeThenLoadGoogleEvents
}
