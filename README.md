## &lt;Calenda**Rx** /&gt;

_Prescribed_ React Calendar component.

## Getting Started

```sh
yarn add calendarx
```

or

```sh
npm install calendarx
```

## Usage

```javascript
import Calendar from 'calendarx'

import { Row, Column, Events } from './components'

const events = [{ date: new Date(), id: 'birthday-1' }]

export default () => (
  <Calendar events={events}>
    {({ days, goToNext, goToPrev, goToToday }) => (
      <div>
        <Row>
          <button onClick={goToPrev}>Prev</Button>
          <button onClick={goToToday}>Today</Button>
          <button onClick={goToNext}>Next</Button>
        </Row>
        {days.map((week, i) => (
          <Row key={i}>
            {week.map((day, j) => (
              <Column key={j}>
                {day.events.map(event => (
                  <Event key={event.id} {...event} />
                ))}
              </Column>
            ))}
          </Row>
        ))}
      </div>
    )}
  </Calendar>
)
```

## Props

| Option        | Default      | Type                                     | Description                                 |
| :------------ | :----------- | :--------------------------------------- | :------------------------------------------ |
| referenceDate | `new Date()` | UTC Timestamp `String`, `Date`, `Moment` | Where the calendar is centered around       |
| numDays       | `35`         | `Number`                                 | Number of days the calendar should display. |
| events        | `[]`         | `Array`                                  | Events passed into the calendar             |

**Note**: the `Calendarx` days grid will adapt depending on the number of days that are specified
in `numDays`. If 4 is passed in, the first column will start with your
`referenceDate`, where if 7 is passed in the calendar will align itself to a
week view, and if >7 (the default is 35) is passed in, the calendar will pivot to return the entire
month. This is useful for displaying a full month in an even 5x7 grid.

## Returned from `props.children()`

## Contributing

Please do! If you have ideas, bug fixes, or examples to showcase, please [submit a PR/issue](https://github.com/mfix22/calendarx/pulls).

1. `yarn`
2. `yarn test`
3. `yarn build`

## Inspiration

This project was inspired by Kyle Stetz's [CLNDR](http://kylestetz.github.io/CLNDR/).
