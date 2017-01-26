import React from 'react'
import GooglePlaceAutocomplete from 'googlePlaceAutocomplete'

class PlaceAutocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleNewRequest = this.handleNewRequest.bind(this)
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    })
  }

  handleNewRequest(newLocation) {
    this.setState({
      value: newLocation ? newLocation.description : this.state.value
    })
  }

  render() {
    return (
      <GooglePlaceAutocomplete
        {...this.props}
        searchText={this.state.value}
        onChange={this.handleChange}
        onNewRequest={this.handleNewRequest}
        name={'location'}
      />
    )
  }
}

export default PlaceAutocomplete
