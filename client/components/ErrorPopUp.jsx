import React from 'react'
import { connect } from 'react-redux'
import Snackbar from 'material-ui/Snackbar'

import { color } from '../vars'

const style = {
  color: 'white',
  backgroundColor: color.error,
  textAlign: 'center',
  maxWidth: '240px'
}
const inlineColor = {
  color: 'white'
}

const ErrorPopUp = ({ message }) => (
  <Snackbar
    open={!!message}
    message={message ? message.message : 'No Error'}
    bodyStyle={style}
    contentStyle={inlineColor}
    style={inlineColor}
    action="MORE"
    onActionTouchTap={() => console.log(message)}
  />
)

const mapStateToProps = state => ({
  message: state.error
})

export default connect(mapStateToProps)(ErrorPopUp)
