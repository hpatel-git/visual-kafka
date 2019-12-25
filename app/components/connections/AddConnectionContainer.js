// @flow
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as connectionActionsCreator from '../../store/connections/actionCreator'
import AddConnection from './AddConnection'
// $FlowFixMe
class AddConnectionContainer extends Component<Props> {
  addConnectionHandler = connectionDetails => {
    const { connectionActions } = this.props
    const { addConnections } = connectionActions
    addConnections(connectionDetails)
  }

  render() {
    return <AddConnection addConnectionHandler={this.addConnectionHandler} />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    connectionActions: bindActionCreators(connectionActionsCreator, dispatch),
  }
}

export default connect<*, *, *, *, *, *>(
  null,
  mapDispatchToProps
)(withRouter(AddConnectionContainer))
