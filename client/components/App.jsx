import React from 'react'
import moment from 'moment'

import Calendar from './calendar/Calendar'

// configureGlobalKeyPress(store)

const fakeEvents = [
  {
    id: 1,
    title: 'Birthday',
    time: '2016-11-17T16:30:00-05:00',
    location: 'Home',
    color: '#f284a8'
  },
  {
    id: 2,
    title: "Meeting @ Aldo's",
    time: '2016-11-18T17:30:00-05:00',
    location: "Aldo's Cafe"
  },
  {
    id: 3,
    title: 'Test Meeting w/ some B',
    time: '2016-11-18T18:30:00-05:00',
    location: 'ECB',
    color: '#239207'
  },
  {
    id: 4,
    title: 'HELP',
    time: '2016-11-19T13:00:00-05:00',
    location: 'ECB',
    color: '#cced00'
  }
]

const App = () => (
  <Calendar
    events={fakeEvents}
    referenceDate={moment().format()}
    daysInView={35}
  />
)

export default App
