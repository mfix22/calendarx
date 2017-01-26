import React from 'react'
import PlainActionButton from './PlainActionButton'

const NextButton = () => (
  <PlainActionButton style={{ minWidth: '50px' }} action="VIEW_NEXT">
    <i className="material-icons" style={{ verticalAlign: 'middle' }}>navigate_next</i>
  </PlainActionButton>
)
export default NextButton
