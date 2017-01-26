import React from 'react'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'

const buttonTypes = {
  FlatButton,
  RaisedButton,
  IconButton,
}

const PlainActionButton = ({ buttonType, disabled, style, action, onClick, label, children }) => {
  const Button = buttonTypes[buttonType] || FlatButton
  switch (buttonType) {
    case 'FlatButton':
      return (
        <FlatButton
          primary
          label={label}
          onMouseUp={onClick}
          action={action}
          style={style}
          disabled={disabled}
        >
          {children}
        </FlatButton>
      )
    default:
      return (
        <Button
          label={label}
          onMouseUp={onClick}
          action={action}
          style={style}
          disabled={disabled}
        >
          {children}
        </Button>
      )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({ type: ownProps.action })
    }
  }
}

export default connect(null, mapDispatchToProps)(PlainActionButton)
