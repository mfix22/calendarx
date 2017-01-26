import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'

const DEFAULT_DURATION = 30 * 60 * 1000

const humanize = (time) => {
  if (time < 60 * 60 * 1000) return `${Math.floor(time / (60 * 1000))} minutes`
  return `${time / (60 * 60 * 1000)} hours`
}

const baseValues = [30, 60, 15, 90, 120, 45]
                    .concat([...Array(29).keys()].map(key => key + 1))
                    .concat([...Array(8).keys()].map(key => (key + 5) * 30))
// convert minutes to milliseconds
const timeValues = baseValues.map(minutes => minutes * 60 * 1000).map(value => ({
  text: humanize(value),
  value
}))

const style = {
  width: '96px',
  marginTop: '16px',
  float: 'left'
}

class DurationPicker extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: DEFAULT_DURATION
    }

    this.handleChangeDuration = this.handleChangeDuration.bind(this)
  }

  handleChangeDuration(choice) {
    this.setState({
      value: choice.value
    })
  }

  render() {
    return (
      <AutoComplete
        openOnFocus
        hintText={humanize(this.state.value)}
        searchText={''}
        dataSource={timeValues}
        dataSourceConfig={{ text: 'text', value: 'value' }}
        filter={AutoComplete.fuzzyFilter}
        maxSearchResults={5}
        style={style}
        onNewRequest={this.handleChangeDuration}
        floatingLabelFixed
        floatingLabelText="How long?"
      />
    )
  }
}

export default DurationPicker
