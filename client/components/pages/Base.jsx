import React from 'react'
// import { connect } from 'react-redux'
import AppBar from '../AppBar'
import Form from '../Form'
import CalendarPaper from '../calendar/CalendarPaper'
import ErrorPopUp from '../ErrorPopUp'

const style = {
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  container: {
    display: 'flex',
    minHeight: '700px',
    minWidth: '1200px',
    alignItems: 'center',
    flexDirection: 'column',
  },
  paperContainer: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '1600px',
    width: '100%',
  }
}

const Base = ({ params, children }) => (
  <div style={style.container}>
    <AppBar params={params} />
    <div style={style.paperContainer}>
      <Form params={params} />
      <CalendarPaper params={params} />
    </div>
    <ErrorPopUp />
    {children}
  </div>
)

export default Base
