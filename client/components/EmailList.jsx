import React from 'react'
import { connect } from 'react-redux'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'

const style = {
  list: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  item: {
    margin: '4px',
  }
}

class EmailList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.props.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    })
  }

  render() {
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            this.handleSubmit(this.state.value)
            this.state.value = ''
          }}
        >
          <TextField
            hintText={this.props.hint}
            floatingLabelText={this.props.label}
            floatingLabelFixed
            value={this.state.value}
            onChange={this.handleChange}
            style={{ display: 'block' }}
          />
          <input style={{ display: 'none' }} type="submit" value="Submit" />
        </form>
        <div style={style.list}>
          {this.props.items.map((item, index) => {
            return <Chip key={index} style={style.item} onRequestDelete={() => this.props.handleChipDelete(item)}>{item}</Chip>
          })}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  items: state.emails
})

const mapDispatchToProps = dispatch => ({
  handleSubmit: (email) => {
    dispatch({
      type: 'ADD_EMAIL',
      email
    })
  },
  handleChipDelete: (email) => {
    dispatch({
      type: 'DELETE_EMAIL',
      email
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EmailList)
