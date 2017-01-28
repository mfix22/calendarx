## &lt;CalendRx /&gt;

As easy as putting `<Calendarx />` in your React app.

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
| themeColor     | `'#4dc2fa'`          | `String` - CSS     | Accents things like today's date                            |        

### Props
This project was inspired by Kyle Stetz's [CLNDR](http://kylestetz.github.io/CLNDR/)
