import React from 'react'

import PlainActionButton from './PlainActionButton'

const NotificationsButton = () => (
  <PlainActionButton buttonType="IconButton" style={{ minWidth: '50px' }} action="VIEW_NEXT">
    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd"><circle fill="#757575" cx="10" cy="10" r="10" />
        <path d="M13.342 11.774l1.083 1.084v.53H5.806v-.53l1.084-1.084V9.103c0-.84.214-1.571.643-2.193.428-.621 1.02-1.025 1.776-1.21v-.377c0-.219.076-.408.227-.567a.763.763 0 0 1 .58-.24c.235 0 .428.08.58.24.15.16.226.348.226.567V5.7c.756.184 1.349.588 1.777 1.21.429.62.643 1.352.643 2.192v2.671zM10.116 15c-.302 0-.559-.105-.769-.315a1.017 1.017 0 0 1-.315-.743H11.2c0 .285-.11.533-.328.743-.218.21-.47.315-.756.315z" fill="#FFF" />
      </g>
    </svg>
  </PlainActionButton>
)
export default NotificationsButton
