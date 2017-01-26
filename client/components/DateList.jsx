import React from 'react'
import { connect } from 'react-redux'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import FlatButton from 'material-ui/FlatButton'
import moment from 'moment'

import Label from './Label'
import { sendVote } from '../api'
import { color } from '../vars'
import { CHANGE_TIME, CHANGE_DATE, ADD_OPTION, DELETE_OPTION } from '../actions'

const style = {
  form: {
    position: 'relative',
    paddingTop: '12px',
    margin: '16px 0px 0px 0px'
  },
  timePicker: {
    width: '136px',
    marginRight: '16px',
    float: 'left'
  },
  datePicker: {
    width: '136px',
    float: 'left'
  },
  submit: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  chips: {
    paddingTop: '24px',
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: '4px',
  }
}

const optionToDisplayString = (option) => {
  return `${moment(option).format('MMM Do')}, ${moment(option).format('LT')}`
}

const DatePickerWithList = ({
                              EDIT_FORM,
                              time,
                              date,
                              options,
                              disabled,
                              params,
                              hintTextTimeFrom,
                              hintTextDate,
                              handleVote,
                              handleChangeTime,
                              handleChangeDate,
                              handleChipAdd,
                              handleChipDelete
                            }) => {
  return (
    <div>
      {
        EDIT_FORM ? (
          <form style={style.form}>
            <Label labelFor="TimePicker" text="When" />
            <TimePicker
              hintText={hintTextTimeFrom}
              value={time}
              onChange={handleChangeTime}
              textFieldStyle={style.timePicker}
            />
            <DatePicker
              autoOk
              value={date}
              hintText={hintTextDate}
              textFieldStyle={style.datePicker}
              mode="landscape"
              onChange={handleChangeDate}
            />
            <FlatButton label="Add option" disabled={disabled} onClick={handleChipAdd} />
          </form>
        ) : null
      }
      <div style={style.chips}>
        <Label labelFor="Chips" text={options.length ? 'Options' : ''} />
        {options.map((option, index) => {
          const timeKey = Object.keys(option)[0]
          const count = option[timeKey]
          return (
            <Chip
              key={index}
              style={style.chip}
              onRequestDelete={EDIT_FORM ? () => handleChipDelete(timeKey) : null}
            >
              {
                !EDIT_FORM ? (
                  <Avatar
                    onClick={() => handleVote({ id: params.event_id, option: timeKey })}
                    size={24}
                    style={{ cursor: 'pointer' }}
                    backgroundColor={(index === 0) ? color.green : null}
                  >
                    {count}
                  </Avatar>
                ) : null // don't display vote counts unless voting
              }
              {optionToDisplayString(timeKey)}
            </Chip>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { time, date, options } = state.form
  return {
    options,
    time: (!time) ? null : moment(time).toDate(),
    date: (!date) ? null : moment(date).toDate(),
    disabled: !time || !date
  }
}

const mapDispatchToProps = dispatch => ({
  handleChangeTime: (e, time) => {
    dispatch({
      type: CHANGE_TIME,
      time
    })
  },
  handleChangeDate: (e, date) => {
    dispatch({
      type: CHANGE_DATE,
      date
    })
  },
  handleChipAdd: () => {
    dispatch({
      type: ADD_OPTION
    })
  },
  handleChipDelete: (time) => {
    dispatch({
      type: DELETE_OPTION,
      time
    })
  },
  // meta: current event_id and time option being voted on
  handleVote: (meta) => {
    dispatch(sendVote(meta))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DatePickerWithList)
