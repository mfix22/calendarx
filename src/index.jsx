import React from 'react'
import { render } from 'react-dom'
import moment from 'moment'

import Calendarx from './components/Calendarx'

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

// const NewEvent = details => (
//   <p>
//     {details.time}
//   </p>
// )

render(
  <div>
    <Calendarx numDays={42} width={600} events={fakeEvents} />
    <Calendarx numDays={7} events={fakeEvents} />
  </div>,
  document.getElementById('root')
)
