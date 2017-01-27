import React from 'react'
import moment from 'moment'

import Calendar from './calendar/Calendar'

// configureGlobalKeyPress(store)

const fakeEvents = [
  {
    id: 1,
    title: 'Birthday',
    time: moment().add(0, 'd').format(),
    location: 'Home',
    color: '#f284a8'
  },
  {
    id: 2,
    title: "Meeting @ Aldo's",
    time: moment().add(1, 'd').format(),
    location: "Aldo's Cafe"
  },
  {
    id: 3,
    title: 'Test Meeting w/ some B',
    time: moment().add(-2, 'd').format(),
    location: 'ECB',
    color: '#239207'
  },
  {
    id: 4,
    title: 'HELP',
    time: moment().add(1, 'd').format(),
    location: 'ECB',
    color: '#cced00'
  }
]

const App = () => (
  <Calendar
    events={fakeEvents}
    referenceDate={moment().format()}
    daysInView={4}
  />
)

export default App
