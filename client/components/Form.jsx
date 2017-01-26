import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import MaterialTextField from 'material-ui/TextField'

import PlaceAutocomplete from './PlaceAutocomplete'
import Paper from './Paper'
import TextField from './TextField'
import EmailList from './EmailList'
import DateList from './DateList'
import DurationPicker from './DurationPicker'

import { color } from '../vars'
import { sendEvent } from '../api'

// import EmojiBar from './EmojiBar'

const style = {
  form: {
    flexDirection: 'column',
    minWidth: '360px',
    width: '30%',
    height: '85%',
    padding: '24px 36px',
    margin: '0 8px 0 0'
  },
  h2: {
    display: 'inlineBlock',
    margin: '0px 0px 16px 0px',
    textTransform: 'uppercase'
  },
  scheduleButton: {
    backgroundColor: color.green,
    width: '104px',
    margin: '16px auto 0px auto'
  }
}

const Form = ({ onClick, params, router, titleReceived, locationReceived }) => {
  let input
  let location
  let duration
  const EDIT_FORM = !(params && params.event_id)

  if (!EDIT_FORM) {
    // FIXME update this section to use viewing components
    return (
      <Paper style={style.form}>
        <h2 style={style.h2}>{'Vote for event times'}</h2>
        <MaterialTextField
          value={titleReceived}
          disabled
          floatingLabelText="What"
          fullWidth
        />
        <DateList
          EDIT_FORM={EDIT_FORM}
          hintTextDate="On what day?"
          hintTextTimeFrom="Starting at?"
          hintTextTimeTo="Until?"
          params={params}
        />
        <MaterialTextField
          value={locationReceived}
          disabled
          floatingLabelText="Where"
          fullWidth
        />
        <EmailList
          hint="Emails to invite?"
          label="Who"
        />
        <RaisedButton
          label={'Share'}
          style={style.scheduleButton}
          onClick={
            () => { router.push(`/share/${params.event_id}`) }
          }
        />
      </Paper>
    )
  }
  return (
    <Paper style={style.form}>
      <h2 style={style.h2}>{(EDIT_FORM) ? 'Propose an event' : 'Vote for event times'}</h2>
      <TextField
        hintText="What are you planning?"
        floatingLabelText="What"
        fullWidth
        disabled={!EDIT_FORM}
        ref={(node) => {
          input = node
        }}
      />
      {/* <EmojiBar /> */}
      <DateList
        EDIT_FORM={EDIT_FORM}
        hintTextDate="On what day?"
        hintTextTimeFrom="Starting at?"
        hintTextTimeTo="Until?"
        params={params}
      />
      <DurationPicker
        params={params}
        ref={(node) => {
          duration = node
        }}
      />
      <PlaceAutocomplete
        style={style.placeAutocomplete}
        hintText="Where is your event taking place?"
        floatingLabelText="Where"
        floatingLabelFixed
        fullWidth
        ref={(node) => {
          location = node
        }}
      />
      <EmailList
        hint="Emails to invite?"
        label="Who"
      />
      {/* <RadioField /> */}
      <RaisedButton
        label={EDIT_FORM ? 'Schedule' : 'Share'}
        style={style.scheduleButton}
        onClick={
          EDIT_FORM ?
            () => {
              onClick({
                duration: duration.state.value,
                location: location.state.value,
                title: input.state.value
              }, router)
            } :
            () => { router.push(`/share/${params.event_id}`) }
        }
      />
    </Paper>
  )
}

const mapStateToProps = state => ({
  locationReceived: state.form.location,
  titleReceived: state.form.title
})

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (input, router) => {
      if (input.title) {
        dispatch(sendEvent(input))
          .then(response => router.push(`/event/${response.data.id}`))
      } else {
        alert('Events require title')
      }
    }
  }
}

Form.contextTypes = {
  router: React.PropTypes.object
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form))
