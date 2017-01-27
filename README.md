## <CALENDARx />

As easy as putting `<Calendarx />` in your React app.

## Options

| Option         | Default              |  Type              |
| :------------- | :-------------       | :-------------     |
| events         | `[]`                 | `Array`            |
| referenceDate  | `Date.now()`         | UTC Timestamp `String`, `Date`, `Moment` |
| daysInView     | `35`                 | `Number`           |
| width          | `'100%'`             | `String` - CSS string, `Number` - number of pixels |
| height         | `width` or `'600px'` | `String` - CSS string, `Number` - number of pixels |
| todayClass     | `'today'`            | `String`           |
| prevMonthClass | `'prevMonth'`        | `String`           |
| nextMonthClass | `'nextMonth'`        | `String`           |
| prevMonthStyle | `{ opacity: 0.4 }`   | `Object` - follow React style syntax |
| nextMonthStyle | `{ opacity: 0.4 }`   | `Object` - follow React style syntax |
<!-- | todayStyle     |  -->

### Props
This project was inspired by Kyle Stetz's [CLNDR](http://kylestetz.github.io/CLNDR/)
