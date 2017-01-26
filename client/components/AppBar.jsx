import React from 'react'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

import Logo from './Logo'
import SchedulingStepper from './SchedulingStepper'
import NotificationsButton from './buttons/NotificationsButton'
import AvatarButton from './buttons/AvatarButton'
import { color } from '../vars'

const style = {
  appBar: {
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    position: 'relative',
    width: '100%',
    maxWidth: '1600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '24px',
    paddingRight: '24px',
    height: '64px',
    margin: '8px 0',
  },
  container: {
    display: 'flex',
    alignItems: 'center'
  }
}

const getActiveStep = (params) => {
  if (location.pathname === '/new') return 1
  // index 1 is first path
  if (params.event_id && location.pathname.split('/')[1] === 'share') return 2
  return 3
}

const AppBar = ({ params }) => (
  <div style={style.appBar}>
    <div style={style.container}>
      <IconButton>
        <NavigationMenu />
      </IconButton>
      <Logo />
    </div>
    <SchedulingStepper activeStep={getActiveStep(params)} />
    <div style={Object.assign(style.container, { paddingRight: '12px' })}>
      <NotificationsButton />
      {/* <AvatarButton src="/images/user-jake.png" size={32} /> */}
    </div>
  </div>
)

export default AppBar
