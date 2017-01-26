import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import Chip from 'material-ui/Chip'
import Paper from './Paper'
import { color, type } from '../vars'
// import RadioField from '../RadioField'
// import EmojiBar from './EmojiBar'

const style = {
  form: {
    position: 'absolute',
    top: '50vh',
    left: '50vw',
    transform: 'translate(-50%, -50%)',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '460px',
    width: '460px',
    height: 'initial',
    minHeight: '444px',
    padding: '24px 36px',
    margin: '0',
    zIndex: 1000,
  },
  h2: {
    display: 'inline-block',
    fontFamily: type.main,
    margin: '0px 0px 4px 0px',
    fontSize: '36px'
  },
  h4: {
    display: 'inline-block',
    fontFamily: type.main,
    margin: '0px 0px 32px 0px',
    fontSize: '16px'
  },
  sendButton: {
    width: '104px',
    margin: '8px 8px',
    display: 'inline-block'
  },
  image: {
    display: 'inline-block',
    pointerEvents: 'none',
    width: '92px',
    height: '92px',
    margin: '0 auto 16px'
  },
  code: {
    fontFamily: 'Consolas, Courier New, monospace',
    margin: '0px 0px 16px',
    fontSize: '16px',
    userSelect: 'all',

  },
  item: {
    margin: '4px 4px 16px',
    display: 'inline-block'
  },
  snackbar: {
    backgroundColor: color.green,
    textAlign: 'center',
    maxWidth: '240px'
  },
}

const copy = (node) => {
  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(node)
  selection.removeAllRanges()
  selection.addRange(range)
  const success = document.execCommand('copy')
  selection.removeAllRanges()
}

let link

class Confirmation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }

  handleTouchTap() {
    this.setState({
      open: true,
    })
  }

  handleRequestClose() {
    this.setState({
      open: false,
    })
  }

  render() {
    return (
      <div>
        <a href={`/event/${this.props.params.event_id}`}>
          <div className="full-black-cover" />
        </a>
        <Paper style={style.form}>
          <img
            style={style.image}
            alt="Success" src="/images/party.png"
          />
          <h2 style={style.h2}>{'Event created.'}</h2>
          <h4 style={style.h4}>{'Would you like to share it?'}</h4>
          <code
            ref={(node) => {
              link = node
            }}
            style={style.code}
          >
            {`${location.host}/event/${this.props.params.event_id}`}
          </code>
          <div style={style.list}>
            {this.props.emails.map((item, index) => {
              return <Chip key={index} style={style.item}>{item}</Chip>
            })}
          </div>
          <div>
            <RaisedButton
              primary
              label="Send"
              style={style.sendButton}
            />
            <RaisedButton
              label="Copy"
              style={style.sendButton}
              onClick={() => {
                copy(link)
                // link.blur()
                this.setState({ open: true })
              }}
            />
          </div>
        </Paper>
        <Snackbar
          open={this.state.open}
          message="Copied!"
          autoHideDuration={3000}
          bodyStyle={style.snackbar}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  emails: state.emails
})

const mapDispatchToProps = (dispatch) => {
  return {
    onSend: () => {
      dispatch({
        type: 'SEND_EMAILS'
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation)
