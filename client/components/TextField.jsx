import React from 'react'
import MaterialTextField from 'material-ui/TextField'

class TextField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    })
  }

  render() {
    return (
      <MaterialTextField
        {...this.props}
        floatingLabelFixed
        value={this.state.value}
        onChange={this.handleChange}
      />
    )
  }
}

export default TextField
