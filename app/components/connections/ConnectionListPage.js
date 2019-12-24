// @flow
import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { bindActionCreators } from 'redux'
// import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as connectionActionsCreator from '../../store/connections/actionCreator'
import * as viewerActionsCreator from '../../store/viewer/actionCreator'

import Connection from './Connection'
// $FlowFixMe
class ConnectionListPage extends Component<Props> {
  componentDidMount() {
    const { connectionActions } = this.props
    const { fetchConnections } = connectionActions
    fetchConnections()
  }

  connectEventHandler = connectionDetails => {
    const { history } = this.props
    history.push(`/viewer/${connectionDetails.id}`)
  }

  render() {
    const { configurations } = this.props
    return (
      <Grid container spacing={2}>
        {configurations &&
          configurations.map(config => (
            <Connection
              key={config.id}
              connectionDetails={config}
              connectEventHandler={this.connectEventHandler}
            />
          ))}
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const { connections } = state
  const { configurations } = connections
  return {
    configurations,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    connectionActions: bindActionCreators(connectionActionsCreator, dispatch),
    viewerActions: bindActionCreators(viewerActionsCreator, dispatch),
  }
}

export default connect<*, *, *, *, *, *>(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ConnectionListPage))
