import React from 'react'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

// import { color } from '../vars'

// const style = {
//   appBar: {
//     backgroundColor: color.green,
//   },
// }

const RadioField = () => (
  <RadioButtonGroup name="notRight" labelPosition="right" >
    <RadioButton
      value="reverse"
      label="Invite only"
    />
    <RadioButton
      value="reverse"
      label="Anyone with link"
    />
  </RadioButtonGroup>
)


export default RadioField
