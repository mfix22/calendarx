import React from 'react'
import PlainActionButton from './PlainActionButton'

const PrevButton = () => (
  <PlainActionButton style={{ minWidth: '50px' }} action="VIEW_PREV">
    <i className="material-icons" style={{ verticalAlign: 'middle' }}>navigate_before</i>
  </PlainActionButton>
)
export default PrevButton
