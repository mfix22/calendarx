import moment from 'moment'
import { add, isSame } from '../src/util'

describe('add', () => {
  const initialDate = moment('2019-02-18', 'YYYY-MM-DD')
  test.each([
    ['years', '2020-02-18'],
    ['year', '2020-02-18'],
    ['y', '2020-02-18'],
    ['months', '2019-03-18'],
    ['month', '2019-03-18'],
    ['M', '2019-03-18'],
    ['weeks', '2019-02-25'],
    ['week', '2019-02-25'],
    ['w', '2019-02-25'],
    ['days', '2019-02-19'],
    ['day', '2019-02-19'],
    ['d', '2019-02-19'],
    ['random value', '2019-02-18']
  ])('add(2019-02-18, 1, %s) === %s', (type, result) => {
    expect(
      add(initialDate, 1, type)
        .toISOString()
        .split('T')[0]
    ).toBe(result)
  })

  test.each([
    ['2019-02-18', 'day', true],
    ['2019-02-19', 'day', false],
    ['2019-02-19', 'week', true],
    ['2019-02-24', 'week', false],
    ['2019-02-28', 'month', true],
    ['2019-03-01', 'month', false],
    ['2019-07-09', 'year', true],
    ['2020-07-09', 'year', false]
  ])('isSame(2019-02-18, %s, %s) === %s', (compareDate, precision, result) => {
    const d1 = moment('2019-02-18', 'YYYY-MM-DD').toDate()
    const d2 = moment(compareDate, 'YYYY-MM-DD').toDate()

    expect(isSame(d1, d2, precision)).toBe(result)
  })
})