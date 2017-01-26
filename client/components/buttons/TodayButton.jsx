import React from 'react'
import PlainActionButton from './PlainActionButton'

const TodayButton = ({ disabled }) => (
  <PlainActionButton disabled={disabled} label="TODAY" action="VIEW_TODAY" />
)
export default TodayButton
