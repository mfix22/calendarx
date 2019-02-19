# 📅 Calenda**Rx**

> The simplest React Calendar container

[![npm](https://img.shields.io/npm/v/calendarx.svg?style=flat)](https://www.npmjs.org/package/calendarx)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) [![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

## Getting Started

```sh
yarn add calendarx
```

or

```sh
npm install calendarx
```

## Example usage

```javascript
import Calendar from 'calendarx'

import { Row, Column, Events } from './components'

const events = [{ date: new Date(), id: 'birthday-1' }] // optional

export default () => (
  <Calendar events={events}>
    {({ days, isoDate, goToNext, goToPrev, goToToday }) => (
      <div>
        <Row>
          <span>{new Date(isoDate).toDateString()}</span>
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

| Option                 | Default      | Type                                 | Description                                                                   |
| :--------------------- | :----------- | :----------------------------------- | :---------------------------------------------------------------------------- |
| **`children`**         | `Function`   | `undefined`                          | Render prop component. See [docs below](#render-props) for the options passed |
| `initialReferenceDate` | `new Date()` | `Date`, `String`, `Number`, `Moment` | Sets the initial state of `referenceDate` for uncontrolled usage              |
| `numDays`              | `35`         | `Number`                             | Number of days the calendar should display.                                   |
| `events`               | `[]`         | `Array`                              | Events passed into the calendar                                               |
| `startOfWeek`          | `0`          | `Number[0-6]`                        | Weekday to start the week on. Sunday (0) - Saturday (6)                       |
| `render`               | `Function`   | `undefined`                          | Optional, same as `children`                                                  |

**Note**: the `Calendarx` days grid will adapt depending on the number of days that are specified
in `numDays`. If 4 is passed in, the first column will start with your
`referenceDate`, where if 7 is passed in the calendar will align itself to a
week view, and if >10 (the default is 35) is passed in, the calendar will pivot to return the entire
month. This is useful for displaying a full month in an even 5x7 grid.

## Render Props

| Option      | Type                                                          | Description                                                                                       |
| :---------- | :------------------------------------------------------------ | :------------------------------------------------------------------------------------------------ |
| `days`      | `{ date: String, events: [] }[][]`                            | 2-dimentional grid of objects representing each calendar day                                      |
| `isoDate`   | `String`                                                      | ISO representation of current date state                                                          |
| `unixDate`  | `Number`                                                      | Unix representation of current date state                                                         |
| `jump`      | `Function(n: Number, units: 'years'|'months'|'weeks'|'days')` | Function to jump a specific amount of time                                                        |
| `goToNext`  | `Function()`                                                  | Sets `referenceDate` to next day if `numDays` is <= 4, next week if <= 10, and next month if > 10 |
| `goToToday` | `Function()`                                                  | Set the `referenceDate` to today                                                                  |
| `goToPrev`  | `Function()`                                                  | Save as `goToNext`, but in reverse                                                                |
| `goToDate`  | `Function(date: Date | String | Number)`                      | Set `referenceDate` to arbitrary date                                                             |

## Contributing

Please do! If you have ideas, bug fixes, or examples to showcase, please [submit a PR/issue](https://github.com/mfix22/calendarx/pulls).

1. `yarn`
2. `yarn test`
3. `yarn build`

## License

MIT

## Inspiration 💫

This project was inspired by Kyle Stetz's [CLNDR](http://kylestetz.github.io/CLNDR/).
