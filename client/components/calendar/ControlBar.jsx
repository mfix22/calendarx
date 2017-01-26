import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import DropDownMenu from 'material-ui/DropDownMenu'
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar'
import MenuItem from 'material-ui/MenuItem'

import NextButton from '../buttons/NextButton'
import PrevButton from '../buttons/PrevButton'
import TodayButton from '../buttons/TodayButton'
import { getOrderedMonthArray, getNumDaysInView, getDays } from '../../helpers/calendarUtil'
import { color } from '../../vars'

const formatCenterHeader = (view) => {
  const days = getDays(view.date, getNumDaysInView(view.window))
  return `${moment(days[0]).format('M/D')} - ${moment(days[days.length - 1]).format('M/D')}`
}

const style = {
  iconStyle: {
    fill: color.green
  },
  controlBar: {
    position: 'relative',
    backgroundColor: '#fff',
    height: '64px',
    alignItems: 'center',
    borderRadius: '2px 2px 0 0',
    borderBottom: `1px solid ${color.border}`
  },
  labelStyle: {
    fontSize: '24px'
  },
  toolbarGroup: {
    height: '56px'
  }
}

const ControlBar = ({ referenceDate, onChange, viewChoice, onChangeHeader }) => (
  <Toolbar style={style.controlBar} className="controlBar">
    {/* <ToolbarTitle
      style={{ fontSize: '14px', fontWeight: 'bold' }}
      className="rangeHeader"
      text={header}
    /> */}
    <ToolbarGroup style={style.toolbarGroup}>
      <DropDownMenu labelStyle={{ height: '64px' }} iconStyle={style.iconStyle} value={viewChoice} onChange={onChange}>
        <MenuItem value="4_DAY" primaryText="4 Day" />
        <MenuItem value="WEEK" primaryText="Week" />
        <MenuItem value="MONTH" primaryText="Month" />
      </DropDownMenu>
    </ToolbarGroup>
    <ToolbarGroup className="refDateHeaderWrapper" style={style.toolbarGroup}>
      <DropDownMenu
        labelStyle={style.labelStyle}
        value={moment(referenceDate).month()}
        iconStyle={style.iconStyle}
        onChange={onChangeHeader}
      >
        {
          getOrderedMonthArray(referenceDate).map((month, index) => (
            <MenuItem key={index} value={month.month()} primaryText={month.format('MMMM YYYY')} />
          ))
        }
      </DropDownMenu>
    </ToolbarGroup>
    <ToolbarGroup className="buttonContainer">
      <PrevButton />
      <TodayButton disabled={moment(referenceDate).isSame(moment(), 'day')} />
      <NextButton />
    </ToolbarGroup>
  </Toolbar>
)

const mapStateToProps = state => ({
  referenceDate: state.view.date,
  viewChoice: state.view.window,
  header: formatCenterHeader(state.view),
})

const mapDispatchToProps = dispatch => ({
  onChange: (event, index, value) => {
    dispatch({
      type: 'CHANGE_WINDOW',
      window: value,
    })
  },
  onChangeHeader: (event, index/* ,value */) => {
    dispatch({
      type: 'VIEW_FUTURE_MONTHS',
      n: index
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar)
