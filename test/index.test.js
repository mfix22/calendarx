import React from 'react'
import { render as rtlRender } from 'react-testing-library'
import moment from 'moment'

import Calendar from '../src'

function render(options) {
  const children = jest.fn(() => null)
  rtlRender(React.createElement(Calendar, options, children))
  return { children, days: children.mock.calls[0][0].days }
}

function getDateKey(date) {
  return date.toISOString().split('T')[0]
}

const BASIC_CASES = {
  35: [
    '2019-01-27',
    '2019-01-28',
    '2019-01-29',
    '2019-01-30',
    '2019-01-31',
    '2019-02-01',
    '2019-02-02',
    '2019-02-03',
    '2019-02-04',
    '2019-02-05',
    '2019-02-06',
    '2019-02-07',
    '2019-02-08',
    '2019-02-09',
    '2019-02-10',
    '2019-02-11',
    '2019-02-12',
    '2019-02-13',
    '2019-02-14',
    '2019-02-15',
    '2019-02-16',
    '2019-02-17',
    '2019-02-18',
    '2019-02-19',
    '2019-02-20',
    '2019-02-21',
    '2019-02-22',
    '2019-02-23',
    '2019-02-24',
    '2019-02-25',
    '2019-02-26',
    '2019-02-27',
    '2019-02-28',
    '2019-03-01',
    '2019-03-02'
  ],
  4: ['2019-02-18', '2019-02-19', '2019-02-20', '2019-02-21'],
  7: [
    '2019-02-17',
    '2019-02-18',
    '2019-02-19',
    '2019-02-20',
    '2019-02-21',
    '2019-02-22',
    '2019-02-23'
  ]
}

describe.each(['month', 'week', 'day'])('%s view', view => {
  const numDays = view === 'month' ? 35 : view === 'week' ? 7 : 4

  test('basic rendering ', () => {
    const referenceDate = moment('2019-02-18', 'YYYY-MM-DD')

    const { children, days } = render({ initialDate: referenceDate, numDays })

    const flattenedDays = [].concat(...days)

    expect(flattenedDays.length).toBe(numDays)
    expect(flattenedDays.map(d => getDateKey(d.date))).toEqual(BASIC_CASES[numDays])
    expect(children).toHaveBeenCalledWith(
      expect.objectContaining({
        date: new Date('2019-02-18T08:00:00.000Z'),
        days: expect.any(Array),
        jump: expect.any(Function),
        goToNext: expect.any(Function),
        goToPrev: expect.any(Function),
        goToToday: expect.any(Function),
        goToDate: expect.any(Function),
        getPrevButtonProps: expect.any(Function),
        getNextButtonProps: expect.any(Function),
        getTodayButtonProps: expect.any(Function)
      }),
      expect.anything()
    )
  })

  const gridViews = {
    35: [5, 7],
    7: [1, 7],
    4: [1, 4]
  }
  test('grid size is correct', () => {
    const date = '2019-02-18'
    const referenceDate = moment(date, 'YYYY-MM-DD')
    const { days } = render({ initialDate: referenceDate, numDays })

    const [numWeeks, weekLength] = gridViews[numDays]

    expect(days.length).toBe(numWeeks)
    days.map(week => {
      expect(week.length).toBe(weekLength)
    })
  })

  const dayInformationMap = {
    35: 22,
    7: 1,
    4: 0
  }
  test('day information is correct', () => {
    const date = '2019-02-18'
    const referenceDate = moment(date, 'YYYY-MM-DD')
    const event = { date: referenceDate, title: 'Event Title' }

    const { children, days } = render({
      initialDate: referenceDate,
      numDays,
      children,
      events: [event]
    })

    const flattenedDays = [].concat(...days)

    const today = flattenedDays[dayInformationMap[numDays]]

    expect(today.isToday).toBe(true)
    expect(today.isThisWeek).toBe(true)
    expect(today.isThisMonth).toBe(true)
    expect(today.isThisYear).toBe(true)
    expect(today.events).toEqual([event])
  })
})

describe('props', () => {
  test.each([[Calendar.days.MONDAY, 0], [Calendar.days.TUESDAY, 6], [Calendar.days.SATURDAY, 2]])(
    'test starting week on index: %s',
    (startOfWeek, index) => {
      const date = '2019-02-18'
      const referenceDate = moment(date, 'YYYY-MM-DD')

      const { children, days } = render({
        initialDate: referenceDate,
        numDays: 7,
        children,
        startOfWeek
      })

      expect(getDateKey(days[0][index].date)).toBe(date)
    }
  )
})
