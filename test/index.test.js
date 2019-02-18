import React from 'react'
import { render as rtlRender } from 'react-testing-library'
import moment from 'moment'

import Calendar from '..'

function render(options) {
  return rtlRender(<Calendar {...options} />)
}

test('basic rendering', () => {
  const children = jest.fn(() => null)
  const referenceDate = moment('02-17-2019', 'MM-DD-YYYY')
  render({ referenceDate, children })

  const firstCall = children.mock.calls[0][0]

  const flattenedDays = [].concat(...firstCall.days)

  expect(flattenedDays.length).toBe(35)
  expect(flattenedDays.map(d => d.date).map(iso => iso.split('T')[0])).toEqual([
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
    '2019-03-02',
    '2019-03-03',
    '2019-03-04',
    '2019-03-05',
    '2019-03-06'
  ])
  expect(children).toHaveBeenCalledWith(
    expect.objectContaining({
      // referenceDate,
      jump: expect.any(Function),
      goToNext: expect.any(Function),
      goToPrev: expect.any(Function),
      goToToday: expect.any(Function)
    }),
    expect.anything()
  )
})
