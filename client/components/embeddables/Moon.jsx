import React from 'react'
import moment from 'moment'
import { getMoonIllumination } from 'suncalc'

const moonStyle = {
  margin: '2px 8px',
  zIndex: 1000,
  position: 'relative',
  textAlign: 'left'
}

const getEmoji = (value, strict) => {
  if (strict) {
    if (value < 0.03) return '🌑'
    if (value < 0.515 && value > 0.49) return '🌕'
    return <br />
  }
  if (value < 0.03) return '🌑'
  if (value < 0.240) return '🌒'
  if (value < 0.26) return '🌓'
  if (value < 0.49) return '🌔'
  if (value < 0.515) return '🌕'
  if (value < 0.74) return '🌖'
  if (value < 0.76) return '🌗'
  return '🌘'
}

const Moon = ({ date, settings }) => (
  <div style={moonStyle}>
    {getEmoji(getMoonIllumination(moment(date).toDate()).phase, settings ? settings.strict : null)}
  </div>
)

export default Moon
