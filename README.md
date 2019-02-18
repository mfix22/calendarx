## &lt;Calenda**Rx** /&gt;

_Prescribed_ React Calendar component.

![Calendarx Screen Capture](./public/screencap.gif)

## Usage

```javascript
import Calendar from 'calendarx'

export default () => <Calendar />
```

The `Calendarx` view will adapt depending on the number of days that are specified
in `numDays`. If 4 is passed in, the first column will start with your
`referenceDate`, where if 7 is passed in the calendar will align itself to a
week view, and if say 35 is passed in, the calendar will pivot to show the entire
month.

## Options

| Option        | Default      | Type                                     | Description                                 |
| :------------ | :----------- | :--------------------------------------- | :------------------------------------------ |
| referenceDate | `new Date()` | UTC Timestamp `String`, `Date`, `Moment` | Where the calendar is centered around       |
| numDays       | `35`         | `Number`                                 | Number of days the calendar should display. |
| events        | `[]`         | `Array`                                  | Events passed into the calendar             |

### Example

```javascript
const events = [
  {
    date: moment()
      .add(0, 'd')
      .format(),
    id: 1,
    title: 'Birthday',
    location: 'Home',
    color: '#f284a8'
  }
]
const App = () => <Calendarx events={events} />
```

## Contributing

Please do! If you have ideas, fixes, or inspirations, please [submit a PR](https://github.com/mfix22/calendarx/pulls).

## Inspiration (I thought 'Props' would be confusing)

This project was inspired by Kyle Stetz's [CLNDR](http://kylestetz.github.io/CLNDR/).
