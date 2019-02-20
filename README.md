# 📅 Calenda**Rx**

> A React state container for building Calendar components

Calendarx is a state container for creating calendar components with a simple API for displaying days and events sanely and advancing between the months, weeks, or days with ease.

[![npm](https://img.shields.io/npm/v/calendarx.svg?style=flat)](https://www.npmjs.org/package/calendarx)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
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

## Examples

```javascript
import Calendar from 'calendarx'

import { Row, Column, Events } from './components'

const events = [{ date: new Date(), id: 'birthday-1' }] // optional

export default () => (
  <Calendar events={events}>
    {({ days, date, goToNext, goToPrev, goToToday }) => (
      <div>
        <Row>
          <span>{date.toDateString()}</span>
          <button onClick={() => goToPrev()}>&lt;</button>
          <button onClick={goToToday}>Today</button>
          <button onClick={() => goToNext()}>&gt;</button>
        </Row>
        {days.map((week, i) => (
          <Row key={i}>
            {week.map((day, j) => (
              <Column key={j}>
                {day.events.map(event => (
                  <Event isToday={day.isToday} key={event.id} {...event} />
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

for an **Advanced** example, check out:

[![Advanced CalendarX Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/q7x1mpy5xj)

## Props

| Option         | Default      | Type                                 | Description                                                                                                  |
| :------------- | :----------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| **`children`** | `undefined`  | `Function`                           | Render prop component. See [docs below](#render-props) for the options passed                                |
| `initialDate`  | `new Date()` | `Date`, `String`, `Number`, `Moment` | Sets the initial state of `referenceDate` for uncontrolled usage                                             |
| `numDays`      | `35`         | `Number`                             | Number of days the calendar should display. If `numDays` > 10, this will be raised to the next multiple of 7 |
| `events`       | `[]`         | `Array<{ date: DateLike }>`          | Events passed into the calendar. These objects will be injected into the correct array by date.              |
| `startOfWeek`  | `0`          | `Number[0-6]`                        | Weekday to start the week on. Sunday (0) - Saturday (6)                                                      |
| `render`       | `undefined`  | `Function`                           | Optional, same as `children`                                                                                 |

**Note**: the `Calendarx` days grid will adapt depending on the number of days that are specified
in `numDays`. If 4 is passed in, the first column will start with your
`referenceDate`, where if 7 is passed in the calendar will align itself to a
week view, and if >10 (the default is 35) is passed in, the calendar will pivot to return the entire
month. This is useful for displaying a full month in an even 5x7 grid.

## Children Properties

| Option      | Type                                                    | Description                                                                                       |
| :---------- | :------------------------------------------------------ | :------------------------------------------------------------------------------------------------ |
| `days`      | `Day[][]`                                               | 2-dimentional grid of objects representing each calendar day                                      |
| `date`      | `Date`                                                  | Current date state                                                                                |
| `jump`      | `Function(n: Number, units: 'years|months|weeks|days')` | Function to jump a specific amount of time                                                        |
| `goToNext`  | `Function()`                                            | Sets `referenceDate` to next day if `numDays` is <= 4, next week if <= 10, and next month if > 10 |
| `goToToday` | `Function()`                                            | Set the `referenceDate` to today                                                                  |
| `goToPrev`  | `Function()`                                            | Save as `goToNext`, but in reverse                                                                |
| `goToDate`  | `Function(date: DateLike)`                              | Set `referenceDate` to arbitrary date                                                             |

## Types

### `Day`

This object contains the following fields/getters:

- `date`: `Date`
- `events`: `Event[]`
- `isToday`: `Boolean`
- `isThisMonth`: `Boolean`
- `isThisYear`: `Boolean`

### `Event`:

`Event`s will include the other properties you pass alongside `date` in your `events` prop.

## Contributing

Please do! If you have ideas, bug fixes, or examples to showcase, please [submit a PR/issue](https://github.com/mfix22/calendarx/pulls).

1. `yarn`
2. Make your changes
3. `yarn test`
4. Push a [PR](https://github.com/mfix22/calendarx/pulls)

## License

MIT

## Inspiration 💫

This project was inspired by Kyle Stetz's [CLNDR](http://kylestetz.github.io/CLNDR/).
