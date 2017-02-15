## &lt;CalendRx /&gt;

As easy as putting `<Calendarx />` in your React app.

## Usage
```javascript
import Calendarx from 'calendarx'
// or
const Calendarx = require('calendarx')

ReactDOM.render(
  <App>
    <Calendarx />
  </App>,
  document.getElementById('root')
)
```

## Options

| Option         | Default              |  Type              |  Description              |
| :------------- | :-------------       | :-------------     | :-------------            |
| events         | `[]`                 | `Array`            | Events passed into the calendar |
| referenceDate  | `Date.now()`         | UTC Timestamp `String`, `Date`, `Moment` | Where the calendar is centered around |
| numDays        | `35`                 | `Number`           | Number of Days the calendar should display.                 |
| width          | `'100%'`             | `String` - CSS string, `Number` - number of pixels | Width of the calendar       |
| height         | `width` or `'600px'` | `String` - CSS string, `Number` - number of pixels | Height of the calendar      |
| todayClass     | `'today'`            | `String`           | Class to be applied to the `DateColumn` with today's date   |
| currMonthClass | `'currMonth'`        | `String`           | Class to be applied to dates of current month               |
| prevMonthClass | `'prevMonth'`        | `String`           | Class to be applied to dates of previous month              |
| nextMonthClass | `'nextMonth'`        | `String`           | Class to be applied to dates of next month                  |
| prevMonthStyle | `{ opacity: 0.4 }`   | `Object` - follow React style syntax | Style to be applied to dates of previous month |
| nextMonthStyle | `{ opacity: 0.4 }`   | `Object` - follow React style syntax | Style to be applied to dates of next month |
| themeColor     | `'#4dc2fa'`          | `String` - CSS     | Accents things like today's date and events                  |
| EventComponent | see [Overriding Event Component](#overriding-event-component) | `React Class` | Component to display react class |        

## Calendar Events
Passing an `events` array to `<Calendarx />` will create an `EventComponent`
instance for each event, spreading each event as props to the component.
A valid [`Moment`](http://momentjs.com/docs) time is the only required prop to create an event.

### Example
```javascript
const events = [
  {
    id: 1,
    title: 'Birthday',
    time: moment().add(0, 'd').format(),
    location: 'Home',
    color: '#f284a8'
  }
]
const App = () => (
  <Calendarx events={events} />
)
```

### Overriding Event Component
The default `EventComponent` class is rendered like this:
```javascript
const DefaultEvent = () => (
  <div
    { /* if the event is today */ }
    className='calendarEvent today'
    style={details.style || DEFAULT_STYLE}
  >
    <p className="event_details" style={{ margin: 0 }}>
      {moment(details.time).format('LT')}<br />
      { details.title }<br />
      { details.location }<br />
    </p>
  </div>
)
```
with custom `className`s embedded.

You may pass in a new `React` component to override how your events are displayed in the calendar:
```javascript
const NewEventComponent = details => (
  <p>
    {details.time}
  </p>
)

render(
  <Calendarx
    events={fakeEvents}
    EventComponent={NewEventComponent}
  />,
  document.getElementById('calendar')
)
```

### Props
This project was inspired by Kyle Stetz's [CLNDR](http://kylestetz.github.io/CLNDR/).

## Test
[We need some!](https://github.com/mfix22/calendarx/issues/1)
