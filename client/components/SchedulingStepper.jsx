import React from 'react'
import ActionDateRange from 'material-ui/svg-icons/action/date-range'
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add'
import ActionThumbsUpDown from 'material-ui/svg-icons/action/thumbs-up-down'
import ActionSystemUpdateAlt from 'material-ui/svg-icons/action/system-update-alt'
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

import { color } from '../vars'

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  chevron: {
    margin: '0 4px'
  }
}

const stepColor = (activeStep, index) =>
  (activeStep === index ? color.green : color.grey)

const ChevronRight = () => (
  <NavigationChevronRight style={styles.chevron} color={color.grey} viewBox="0 -2 28 28" />
)

const SchedulingStepper = ({ activeStep }) => (
  <div style={styles.container}>
    <ActionDateRange color={stepColor(activeStep, 1)} />
    <ChevronRight />
    <SocialPersonAdd color={stepColor(activeStep, 2)} />
    <ChevronRight />
    <ActionThumbsUpDown color={stepColor(activeStep, 3)} />
    <ChevronRight />
    <ActionSystemUpdateAlt color={stepColor(activeStep, 4)} />
  </div>
)

export default SchedulingStepper
