import React from 'react'
import { connect } from 'react-redux'
import Base from './Base'

class Scheduler extends React.Component {
  componentDidMount() {
    window.onbeforeunload = () => {
      if (this.props.options.length) return "Your changes will be lost. Are you sure you want to leave?"
      return null
    }
  }

  componentWillUnmount() {
    window.onbeforeunload = null
  }

  render() {
    const { params, children } = this.props
    return <Base params={params}>{children}</Base>
  }
}
const mapStateToProps = state => ({
  options: state.form.options
})

export default connect(mapStateToProps)(Scheduler)
