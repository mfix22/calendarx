import moment from 'moment'
import { add } from '../src/util'

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
    ['d', '2019-02-19']
  ])('add(2019-02-18, 1, %s) === %s', (type, result) => {
    expect(
      add(initialDate, 1, type)
        .toISOString()
        .split('T')[0]
    ).toBe(result)
  })
})
