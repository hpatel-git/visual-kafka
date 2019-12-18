// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConnectionListPage from '../components/connections/ConnectionListPage'
import * as connectionActions from '../store/connections/actionCreator'
// $FlowFixMe
class ConnectionPage extends Component<Props> {
  componentDidMount() {
    console.log(this.props)
    const { fetchConnections } = this.props
    fetchConnections()
  }

  render() {
    const { connections } = this.props
    return <ConnectionListPage connections={connections} />
  }
}

const mapStateToProps = state => {
  const { connections } = state
  return {
    connections,
  }
}

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  connectionActions
)(ConnectionPage)
