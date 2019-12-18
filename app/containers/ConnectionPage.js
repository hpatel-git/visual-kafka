// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ConnectionListPage from '../components/connections/ConnectionListPage'
import { fetchConnections } from '../store/connections/actionCreator'
// $FlowFixMe
class ConnectionPage extends Component<Props> {
  render() {
    const { connections } = this.props
    return <ConnectionListPage connections={connections} />
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchConnections,
    },
    dispatch
  )
const mapStateToProps = state => {
  const { connections } = state
  return {
    connections,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionPage)
