import React from 'react'
import Avatar from 'material-ui/Avatar'

import PlainActionButton from './PlainActionButton'

const AvatarButton = props => (
  // <PlainActionButton style={{ minWidth: '50px' }} action="VIEW_NEXT">
  //   <i className="material-icons" style={{ verticalAlign: 'middle' }}>navigate_next</i>
  // </PlainActionButton>
  <Avatar
    {...props}
  />
)
export default AvatarButton
