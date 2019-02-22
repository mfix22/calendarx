# 📅 Calenda**Rx**

> A React state container for building Calendar components

Calendarx is a state container for creating calendar components with a simple API for displaying days and events simply and advancing between the months, weeks, and days with ease.

[![npm](https://img.shields.io/npm/v/calendarx.svg?style=flat)](https://www.npmjs.org/package/calendarx)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
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
| `initialDate`, `date`  | `new Date()` | `Date`, `String`, `Number`, `Moment` | `initialDate` sets the initial state of `date` for uncontrolled usage, otherwise use `date` for controlled usage                                                      |
| `initialNumDays`, `numDays`      | `35`         | `Number`                             | Number of days the calendar should display. If `numDays` > 10, this will be raised to the next multiple of 7. Use `initialNumDays` for uncontrolled usage, `numDays` for controlled |
| `events`       | `[]`         | `Array<{ date: DateLike }>`          | Events passed into the calendar. These objects will be injected into the correct array by date.              |
| `weekStartsOn` | `0`          | `Number[0-6]`                        | Weekday to start the week on. Sunday (0) - Saturday (6).                                                     |
| `render`       | `undefined`  | `Function`                           | Optional, same as `children`                                                                                 |

**Note**: the `Calendarx` days grid will adapt depending on the number of days that are specified
in `numDays`. For example, if 4 is passed in, the first column will start with your `initialDate`. If 7 is passed in (anything <10), the calendar will align itself to the beginning of the week. If `10 < numDays < 365` (the default is 35), the calendar will align to include the entire month and potentially parts of the previous/next month in order to align the grid with your start of the week (default is Sunday).

## Children Properties

| Option      | Type                                                            | Description                                                                        |
| :---------- | :-------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| `days`      | `Day[][]`                                                       | 2-dimentional grid of objects representing each calendar day                       |
| `date`      | `Date`                                                          | Current `date` state                                                               |
| `view`      | `String{'year','month','week','day'}`                           | View according to `numDays`. `day` if <=4, `week` if <= 10, month < 365, or `year` |
| `jump`      | `Function(n: Number, units: {'years','months','weeks','days'})` | Function to jump a specific amount of time                                         |
| `goToNext`  | `Function()`                                                    | Sets `date` state to next date according to `numDays/view`                         |
| `goToToday` | `Function()`                                                    | Set the `date` state to today                                                      |
| `goToPrev`  | `Function()`                                                    | Same as `goToNext`, but in reverse                                                 |
| `goToDate`  | `Function(date: DateLike)`                                      | Set `date` state to arbitrary date                                                 |

## Types

### `Day`

This object contains the following fields/getters:

- `date`: `Date`
- `events`: `Event[]`
- `isToday`: `Boolean`
- `isThisWeek`: `Boolean`
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
